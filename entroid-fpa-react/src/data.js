export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const DEPTS = [
  {id:'ENG',name:'Engineering',owner:'Anika Shah',color:'#4f7cff',limit:6800000},
  {id:'MKT',name:'Marketing',owner:'Rohan Mehta',color:'#a67bfa',limit:4000000},
  {id:'SAL',name:'Sales',owner:'Priya Nair',color:'#31b59a',limit:5100000},
  {id:'HR',name:'Human Resources',owner:'Arjun Iyer',color:'#e9a74a',limit:2100000},
  {id:'OPS',name:'Operations',owner:'Meera Kapoor',color:'#e57686',limit:3500000},
];
export const ACCOUNTS = [
  {id:'4000',name:'Product Revenue',type:'revenue',group:'Revenue',dept:'SAL',base:16800000},
  {id:'4010',name:'Services Revenue',type:'revenue',group:'Revenue',dept:'SAL',base:4800000},
  {id:'5000',name:'Payroll & Benefits',type:'expense',group:'People',dept:'ENG',base:3300000},
  {id:'5010',name:'Cloud Infrastructure',type:'expense',group:'Technology',dept:'ENG',base:910000},
  {id:'5020',name:'Software Subscriptions',type:'expense',group:'Technology',dept:'ENG',base:480000},
  {id:'5030',name:'Digital Campaigns',type:'expense',group:'Marketing',dept:'MKT',base:1850000},
  {id:'5040',name:'Events & Sponsorships',type:'expense',group:'Marketing',dept:'MKT',base:830000},
  {id:'5050',name:'Sales Commissions',type:'expense',group:'Commercial',dept:'SAL',base:1560000},
  {id:'5060',name:'Recruitment & Training',type:'expense',group:'People',dept:'HR',base:770000},
  {id:'5090',name:'HR Payroll & Benefits',type:'expense',group:'People',dept:'HR',base:550000},
  {id:'5070',name:'Facilities & Utilities',type:'expense',group:'Operations',dept:'OPS',base:1130000},
  {id:'5080',name:'Professional Services',type:'expense',group:'Operations',dept:'OPS',base:610000},
  {id:'6000',name:'Capital Equipment',type:'capex',group:'CapEx',dept:'OPS',base:970000},
  {id:'6010',name:'Platform Development CapEx',type:'capex',group:'CapEx',dept:'ENG',base:750000},
];
const monthly = (base, idx) => MONTHS.map((_,m)=>Math.round((base/12)*(1+(m-5.5)*0.014 + ((idx+m)%5-2)*0.014)/100)*100);
export function makeSeed(){
  const budgets={}; const actuals={};const historicalBaseline={};
  ACCOUNTS.forEach((a,i)=>{
    budgets[a.id]=monthly(a.base,i);
    actuals[a.id]=monthly(a.base*.91*(i%3===0?1.045:i%4===0?0.96:1.018),i+2).map((v,m)=>m<9?v:null);
    historicalBaseline[a.id]=monthly(a.base*.91,i+1);
  });
  return {
    currency:'USD', role:'FP&A Manager', entity:'Global Corp', activeCycle:'FY2027',
    cycles:[{id:'FY2027',name:'FY2027 Annual Operating Budget',start:'2027-01-01',end:'2027-12-31',status:'Preparation',owner:'Olivia Bennett',progress:62},{id:'FY2026',name:'FY2026 Annual Operating Budget',start:'2026-01-01',end:'2026-12-31',status:'Published',owner:'Olivia Bennett',progress:100}],
    budgets,actuals,historicalBaseline, baseline:JSON.parse(JSON.stringify(budgets)),
    revenueDrivers:[{id:'RD1',name:'Product licences',account:'4000',units:14000,price:1200},{id:'RD2',name:'Professional services',account:'4010',units:4000,price:1200}],
    headcountPlans:[{id:'HC1',department:'ENG',name:'Engineering team',fte:22,avgCost:150000,account:'5000'},{id:'HC2',department:'HR',name:'HR team',fte:5,avgCost:110000,account:'5090'}],
    capexProjects:[{id:'CP1',name:'Platform development',department:'ENG',account:'6010',amount:750000,status:'Proposed'},{id:'CP2',name:'Equipment refresh',department:'OPS',account:'6000',amount:970000,status:'Approved'}],
    targets:[{id:'T-101',name:'Total Revenue',type:'revenue',amount:23100000,dimension:'Company',status:'Approved'},{id:'T-102',name:'Engineering OpEx',type:'expense',amount:6800000,dimension:'Engineering',status:'Approved'},{id:'T-103',name:'Marketing OpEx',type:'expense',amount:4000000,dimension:'Marketing',status:'Draft'},{id:'T-104',name:'EBITDA Margin',type:'percent',amount:28,dimension:'Company',status:'Draft'}],
    departmentStatuses:{ENG:'Submitted',MKT:'Draft',SAL:'In Review',HR:'Draft',OPS:'Approved'},
    approvals:[{id:'AP-1001',object:'Engineering department budget',type:'Budget',requester:'Anika Shah',amount:5440000,status:'Pending',assigned:'FP&A Manager',date:'2026-10-24'},{id:'AP-1002',object:'Sales budget submission',type:'Budget',requester:'Priya Nair',amount:5100000,status:'Pending',assigned:'CFO / Approver',date:'2026-10-25'},{id:'AP-1003',object:'Engineering CapEx request',type:'CapEx',requester:'Anika Shah',amount:750000,status:'Approved',assigned:'CFO / Approver',date:'2026-10-21'}],
    versions:[{id:'V3',name:'Working Draft v3',status:'Draft',locked:false,created:'2026-10-29',author:'Olivia Bennett',values:JSON.parse(JSON.stringify(budgets))},{id:'V2',name:'Board Review v2',status:'In Review',locked:true,created:'2026-10-18',author:'Olivia Bennett',values:JSON.parse(JSON.stringify(budgets))},{id:'V1',name:'Approved Baseline v1',status:'Published',locked:true,created:'2026-10-01',author:'Olivia Bennett',values:JSON.parse(JSON.stringify(budgets))}],
    comments:[{id:'C1',module:'Budget',ref:'5030',author:'Olivia Bennett',text:'Please confirm the campaign allocation across Q3 and Q4.',date:'2026-10-25',resolved:false},{id:'C2',module:'Budget',ref:'5010',author:'Anika Shah',text:'Cloud infrastructure spend reflects the upcoming capacity expansion.',date:'2026-10-24',resolved:true},{id:'C3',module:'Forecast',ref:'Revenue',author:'Priya Nair',text:'Pipeline conversion assumptions should reflect new enterprise deals.',date:'2026-10-26',resolved:false}],
    forecasts:[{id:'F1',name:'Q4 Latest Estimate',growth:3.8,cost:2.2,months:3,published:false,created:'2026-10-29'},{id:'F2',name:'Downside Outlook',growth:-7.5,cost:4.0,months:6,published:false,created:'2026-10-20'}],
    scenarios:[{id:'SC1',name:'Base case',growth:0,cost:0,probability:55},{id:'SC2',name:'Accelerated growth',growth:12,cost:5,probability:25},{id:'SC3',name:'Revenue pressure',growth:-12,cost:3,probability:20}],
    zbb:[{id:'Z1',name:'APAC demand generation',department:'MKT',amount:420000,score:84,status:'Proposed',justification:'Build qualified pipeline in high-growth regional accounts.'},{id:'Z2',name:'Data platform modernization',department:'ENG',amount:560000,score:91,status:'Funded',justification:'Reduce platform operating overhead and increase throughput.'},{id:'Z3',name:'Sales enablement programme',department:'SAL',amount:210000,score:71,status:'Proposed',justification:'Improve enterprise sales onboarding.'}],
    initiatives:[{id:'I1',name:'Cloud migration',owner:'Engineering',cost:640000,benefit:980000,status:'On track',progress:65},{id:'I2',name:'APAC expansion',owner:'Sales',cost:1200000,benefit:2200000,status:'At risk',progress:38},{id:'I3',name:'Finance automation',owner:'Operations',cost:185000,benefit:470000,status:'On track',progress:82}],
    contingencies:[{id:'CR1',name:'Revenue shortfall response',trigger:'Revenue falls 10% below plan',impact:-1100000,status:'Monitoring',owner:'FP&A Manager'},{id:'CR2',name:'Supplier cost spike',trigger:'Input cost growth exceeds 8%',impact:-480000,status:'Draft',owner:'Operations'},{id:'CR3',name:'Liquidity preservation',trigger:'Cash buffer below 90 days',impact:620000,status:'Draft',owner:'CFO'}],
    deals:[{id:'D1',name:'Northstar Analytics',price:8200000,cost:460000,synergy:1350000,status:'Due diligence',progress:35},{id:'D2',name:'Vector Labs',price:5100000,cost:310000,synergy:780000,status:'Integration',progress:72}],
    audit:[{id:'E1',action:'Initial data loaded',detail:'Illustrative FY2027 planning data',who:'System',when:'2026-10-29 09:00'}]
  };
}
export const money=(n,currency='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency,notation:Math.abs(n)>=1e6?'compact':'standard',maximumFractionDigits:Math.abs(n)>=1e6?2:0}).format(n||0);
export const num=(n)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(n||0);
export const pct=(a,b)=>b===0?'—':`${((a-b)/Math.abs(b)*100).toFixed(1)}%`;
export const annual=(row)=>Array.isArray(row)?row.reduce((v,n)=>v+(Number(n)||0),0):0;
export const total=(data,type)=>ACCOUNTS.filter(a=>!type||a.type===type).reduce((v,a)=>v+annual(data[a.id]),0);
export const depTotal=(data,dep)=>ACCOUNTS.filter(a=>a.dept===dep&&a.type==='expense').reduce((v,a)=>v+annual(data[a.id]),0);
export const clone=(o)=>JSON.parse(JSON.stringify(o));

export const spreadAnnual=(amount)=>{const a=Math.round(Number(amount)||0),base=Math.floor(a/12);return Array.from({length:12},(_,i)=>i===11?a-base*11:base)};
