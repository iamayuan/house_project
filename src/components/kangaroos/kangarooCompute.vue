<template>
  <div>
    <div class="height_auto clearfix">
      <div class="w50">
        <ul class ="leftul">
          <li v-show="condition.loanType==1 || condition.loanType==2">
            <label for="">估算总价：</label>
            <input class="wan" type="number" min="1" v-model="condition.total" @change="cleanInfo">
          </li>
          <li class="loan-first" v-show="condition.loanType==1 || condition.loanType==2">
            <label for="">首付成数：</label>
            <input class="wan" type="number" min="0.1" max="99.9" v-model="condition.payRatio" @blur="numLen('payRatio',0.1,99.9,'%')" @change="cleanInfo">
          </li>
          <li v-show="condition.loanType==3">
            <label for="">商业贷款额：</label>
            <input class="wan" type="number" min="1" v-model="condition.commercialLoan" @change="cleanInfo">
          </li>
          <li class="loan-fund" v-show="condition.loanType==3">
            <label for="">公积金贷款额：</label>
            <input class="wan" type="number" min="1" v-model="condition.fundLoan" @change="cleanInfo">
          </li>
          <li>
            <label for="">贷款类型：</label>
            <select v-model="condition.loanType" @change="cleanInfo">
              <option value="1">商业贷款</option>
              <option value="2">公积金</option>
              <option value="3">组合贷款</option>
            </select>
          </li>
          <li>
            <label for="">贷款时间：</label>
            <input class="wan" type="number" min="1" max="30" v-model="condition.loanTime" @blur="numLen('loanTime',1,30,'年')" @change="cleanInfo">
          </li>
          <li>
            <span @click="condition.repaymentType = 1;cleanInfo()">
              <img v-show="condition.repaymentType == 2" src="../../assets/images/c1.png" class="c-img">
              <img v-show="condition.repaymentType == 1" src="../../assets/images/c2.png" class="c-img">
              <label for="r1">等额本息</label>
            </span>
            <span @click="condition.repaymentType = 2;cleanInfo()">
              <img v-show="condition.repaymentType == 1" src="../../assets/images/c1.png" class="c-img">
              <img v-show="condition.repaymentType == 2" src="../../assets/images/c2.png" class="c-img">
              <label for="r2">等额本金</label>
            </span>
          </li>
        </ul>
      </div>
      <div class="w50">
        <ul class ="rightul">
          <li>
            首付：{{result.payFirst}}
          </li>
          <li>
            贷款金额：{{result.loanMoney}}
          </li>
          <li>
            偿还利息：{{result.repayInterest}}
          </li>
          <li v-show="!result.isFirstM">
            每月还：{{result.repayEveryMonth}}
          </li>
          <li v-show="result.isFirstM">
            首月还款：{{result.repayFirstMonth}}
            <span class="c_more_btn" @click="isShowM=true;scrollTop=0">更多&gt;&gt;</span>
          </li>
        </ul>
      </div>
      <div class="but_blue" @click="mortgageCompute">开始计算</div>
    </div>
    <!-- 月均金额弹框 -->
    <div class="c_more_box" :class="{c_show:isShowM}">
      <div class="c_more_layer" @click="isShowM=false"></div>
      <div class="c_more_cnt">
        <div class="c_more_title">
          <div>月均金额</div>
          <div class="c_more_close" @click="isShowM=false">×</div>
        </div>
        <ul class="c_more_list" :scrollTop.prop="scrollTop">
          <li v-for="(item,index) in result.repayMonthArr">第{{item.key+1}}期：&nbsp;&nbsp;&nbsp;&nbsp;{{item.value}}(元)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 房贷计算器查询条件
        condition: {
          total: '',            // 估算总价
          payRatio: '',         // 首付比例
          loanType: 1,          // 贷款类型
          loanTime: '',         // 贷款时间
          repaymentType: 1,     // 1等额本息/2等额本金
          commercialLoan: '',   // 商业贷款
          fundLoan: ''          // 公积金贷款
        },
        // 房贷计算器查询结果
        result: {
          payFirst: '',         // 首付
          loanMoney: '',        // 贷款金额
          repayInterest: '',    // 偿还利息
          repayEveryMonth: '',  // 每月还款
          isFirstM: false,      // 是否显示首月还款
          repayFirstMonth: '',  // 首月还款
          repayMonthArr: []     // 首月还款数组
        },
        isShowM: false,
        scrollTop: 0
      }
    },
    methods: {
      // 贷款计算
      mortgageCompute () {
        let type = this.condition.loanType;      // 贷款类型
        // 首先判断贷款类型
        if (type == 1 || type == 2){
          let N = this.condition.total*10000;    // 总价
          let X = this.condition.payRatio/100;   // 首付比例
          let M = this.condition.loanTime;       // 贷款时间
          let U = '';                            // 贷款利率（年利率）
          if (type == 1) {
            U = 0.049;
          }else if (type == 2) {
            U = 0.0325;
          }
          let A = N*(1-X);                       // 贷款金额
          //非空校验
          if (N == '') {
            this.$message({
              message: '请填写房源总价！',
              type: 'warning'
            });
            return;
          }
          if (X == '') {
            this.$message({
              message: '请填写首付比例！',
              type: 'warning'
            });
            return;
          }
          if (type == '') {
            this.$message({
              message: '请填写贷款类型！',
              type: 'warning'
            });
            return;
          }
          if (M == '') {
            this.$message({
              message: '请填写贷款时间！',
              type: 'warning'
            });
            return;
          }
          if (this.condition.repaymentType == 1) {
            // 等额本息
            this.result.isFirstM = false;
            this.result.payFirst = this.toThousands((N*X/10000)) + ' 万元';                                 // 首付
            this.result.loanMoney = this.toThousands(N*(1-X)/10000) + ' 万元';                              // 房贷金额
            let payMonth = (N*(1-X)*(U/12)*Math.pow((1+(U/12)),(12*M))/(Math.pow((1+(U/12)),(12*M))-1));
            this.result.repayEveryMonth = this.toThousands(payMonth.toFixed(2)) + ' 元';                    // 每月还款
            this.result.repayInterest = this.toThousands(((12*M)*payMonth-N*(1-X)).toFixed(2)) + ' 元';     // 偿还利息
          }else if (this.condition.repaymentType == 2) {
            // 等额本金
            this.result.isFirstM = true;
            this.result.payFirst = this.toThousands((N*X/10000)) + ' 万元';                                 // 首付
            this.result.loanMoney = this.toThousands(N*(1-X)/10000) + ' 万元';                              // 房贷金额
            this.result.repayInterest = this.toThousands(((12*M+1)*(N*(1-X))*(U/12)/2).toFixed(2)) + ' 元'; // 偿还利息
            let firstMonth = (N*(1-X)/(12*M))+N*(1-X)*(U/12);
            this.result.repayFirstMonth = this.toThousands(firstMonth.toFixed(2)) + ' 元';                  // 首月还款
            // 每期的还款额数组
            let number = '', money = '';
            this.result.repayMonthArr = [];
            this.result.repayMonthArr.push({'key':0,'value':this.toThousands(firstMonth.toFixed(2))});
            for (var i = 1; i < 12*M; i++){
              number = i;
              money = (N*(1-X)/(12*M))+(N*(1-X)-(N*(1-X)/(12*M))*i)*(U/12);
              this.result.repayMonthArr.push({'key':number,'value':this.toThousands(money.toFixed(2))});
            }
          }
        } else if (type == 3) {
          let A1 = this.condition.commercialLoan*10000;     // 商业贷款
          let A2 = this.condition.fundLoan*10000;           // 公积金贷款
          let M = this.condition.loanTime;                  // 贷款时间
          let U1 = 0.049;                                   // 贷款利率（年利率）
          let U2 = 0.0325;                                  // 贷款利率（年利率）
          // 非空校验
          if (A1 == '') {
            this.$message({
              message: '请填写商业贷款金额！',
              type: 'warning'
            });
            return;
          }
          if (A2 == '') {
            this.$message({
              message: '请填写公积金贷款金额！',
              type: 'warning'
            });
            return;
          }
          if (M == '') {
            this.$message({
              message: '请填写贷款时间！',
              type: 'warning'
            });
            return;
          }
          if (this.condition.repaymentType == 1) {
            // 等额本息
            this.result.isFirstM = false;
            this.result.loanMoney = this.toThousands((A1+A2)/10000) + ' 万元';                                  // 房贷总金额
            let payMonth1 = (A1*(U1/12)*Math.pow((1+(U1/12)),(12*M))/(Math.pow((1+(U1/12)),(12*M))-1));         // 每月还款(商业贷款)
            let payMonth2 = (A2*(U2/12)*Math.pow((1+(U2/12)),(12*M))/(Math.pow((1+(U2/12)),(12*M))-1));         // 每月还款(公积金贷款)
            let repayInterest1 = (12*M)*payMonth1-A1;                                                           // 偿还利息
            let repayInterest2 = (12*M)*payMonth2-A2;                                                           // 偿还利息
            this.result.repayInterest = this.toThousands((repayInterest1+repayInterest2).toFixed(2)) + ' 元';   // 总利息
            this.result.repayEveryMonth = this.toThousands((payMonth1+payMonth2).toFixed(2)) + ' 元';           // 总每月还款
          }else if (this.condition.repaymentType == 2) {
            // 等额本金
            this.result.isFirstM = true;
            this.result.loanMoney = this.toThousands((A1+A2)/10000) + ' 万元';                                  // 房贷总金额
            let firstMonth1 = (A1/(12*M))+A1*(U1/12);                                                           // 首月还款(商业贷款)
            let firstMonth2 = (A2/(12*M))+A2*(U2/12);                                                           // 首月还款(公积金贷款)
            let repayInterest1 = (12*M+1)*A1*(U1/12)/2;                                                         // 偿还利息(商业贷款)
            let repayInterest2 = (12*M+1)*A2*(U2/12)/2;                                                         // 偿还利息(公积金贷款)
            this.result.repayFirstMonth = this.toThousands((firstMonth1+firstMonth2).toFixed(2)) + ' 元';       // 总首月还款
            this.result.repayInterest = this.toThousands((repayInterest1+repayInterest2).toFixed(2)) + ' 元';   // 总利息
            // 每期的还款额数组
            let number = '', money1 = '', money2 = '';
            this.result.repayMonthArr = [];
            this.result.repayMonthArr.push({'key':0,'value':this.toThousands((firstMonth1+firstMonth2).toFixed(2))});
            for (let i = 1; i < 12*M; i++){
              number = i;
              money1 = (A1/(12*M))+(A1-(A1/(12*M))*i)*(U1/12);
              money2 = (A2/(12*M))+(A2-(A2/(12*M))*i)*(U2/12);
              this.result.repayMonthArr.push({'key':number,'value':this.toThousands((money1+money2).toFixed(2))});
            }
          }
        }
      },
      // 清除计算信息
      cleanInfo () {
        this.result.payFirst = '';
        this.result.loanMoney = '';
        this.result.repayInterest = '';
        this.result.repayEveryMonth = '';
        this.result.repayFirstMonth = '';
        this.result.repayMonthArr = [];
      },
      // 输入数字长度校验
      numLen (obj, min, max, unit) {
        if (obj == 'payRatio' && this.condition.payRatio != '') {
          if (this.condition.payRatio < min || this.condition.payRatio > max) {
            this.condition.payRatio = '';
            this.$message({
              message: `首付成数为：${min+unit}~${max+unit}之间！请重新输入！`,
              type: 'warning'
            });
          }
        }else if (obj == 'loanTime' && this.condition.loanTime != '') {
          if (this.condition.loanTime < min || this.condition.loanTime > max) {
            this.condition.loanTime = '';
            this.$message({
              message: `贷款时间为：${min+unit}~${max+unit}之间！请重新输入！`,
              type: 'warning'
            });
          }
        }
      },
      // 千位分割
      toThousands (num) {
        num += '';
        num = num.split('.');
        if (num[1]) {
          return num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + num[1];
        }
        return num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
    }
  }
</script>