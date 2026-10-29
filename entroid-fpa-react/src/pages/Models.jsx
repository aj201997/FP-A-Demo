import React, {useState} from 'react';
import { Package, Plus, DollarSign, Users, ArrowRight, Info, CheckCircle2, Send, Activity, Save, ShieldCheck, Calculator } from 'lucide-react';
import {ACCOUNTS,DEPTS,annual,money,spreadAnnual} from '../data';
import {Card,Badge,Button,SectionHead,Tabs,Kpi,Status,Empty,Field,Select} from '../components/ui';

/**
 * Illustrative planning models. Driver changes do not silently overwrite a working
 * budget. Explicit Apply buttons translate each driver's annual amount to monthly
 * financial account lines; this is not a full driver-based ERP calculation service.
 */
export function Models({data,update,inform,canEdit,deptLock,assignApproval}){
  const [tab,setTab]=useState('Revenue drivers');
  const writeable=canEdit&&!deptLock&&data.cycles.find(c=>c.id===data.activeCycle)?.status!=='Published';
  const source=tab==='Revenue drivers'?data.revenueDrivers:tab==='Headcount plan'?data.headcountPlans:data.capexProjects;
  const plannedRevenue=data.revenueDrivers.reduce((v,r)=>v+r.units*r.price,0);
  const plannedPeople=data.headcountPlans.reduce((v,r)=>v+r.fte*r.avgCost,0);
  const plannedCapex=data.capexProjects.reduce((v,r)=>v+r.amount,0);
  const updateField=(collection,id,key,v)=>update(s=>{const x=s[collection].find(r=>r.id===id);x[key]=Math.max(0,Number(v)||0)},'Financial driver updated',`${collection} ${id} ${key}`);
  const apply=(collection)=>{
    if(!writeable){inform('This role cannot apply planning models to the working budget.');return}
    const plans=data[collection];
    const amountFor=p=>collection==='revenueDrivers'?p.units*p.price:collection==='headcountPlans'?p.fte*p.avgCost:p.amount;
    const accounts=[...new Set(plans.map(x=>x.account))];
    update(s=>{for(const account of accounts){const amount=plans.filter(p=>p.account===account).reduce((sum,p)=>sum+amountFor(p),0);s.budgets[account]=spreadAnnual(amount)}},'Planning model applied',`${collection} -> ${accounts.join(', ')}`);
    inform('Planning model applied to working budget accounts. Check Department Budgets to review monthly values.');
  };
  const addRow=(collection)=>{
    if(!writeable){inform('Role cannot add planning drivers.');return}
    const id=Math.random().toString(36).slice(2,7).toUpperCase();
    update(s=>{
      if(collection==='revenueDrivers')s.revenueDrivers.push({id,name:'New revenue stream',account:'4000',units:0,price:0});
      if(collection==='headcountPlans')s.headcountPlans.push({id,name:'New team',department:'ENG',account:'5000',fte:0,avgCost:0});
      if(collection==='capexProjects')s.capexProjects.push({id,name:'New capital request',department:'OPS',account:'6000',amount:0,status:'Proposed'});
    },'Planning model line created',collection);
    inform('New planning line added.');
  };
  const changeText=(collection,id,key,v)=>update(s=>s[collection].find(r=>r.id===id)[key]=v,'Planning model property updated',`${id}: ${key}`);
  return <>
    <div className="toolbar"><Tabs tabs={['Revenue drivers','Headcount plan','Capital expenditure','Operating costs']} value={tab} onChange={setTab}/><Badge>Cycle {data.activeCycle}</Badge></div>
    <div className="kpi-grid"><Kpi label="Modelled revenue" value={money(plannedRevenue)} icon={DollarSign}/><Kpi label="Modelled people cost" value={money(plannedPeople)} icon={Users}/><Kpi label="Modelled CapEx" value={money(plannedCapex)} icon={Package}/><Kpi label="Linked plan accounts" value="6" icon={Calculator}/></div>
    <Card>
      {tab==='Revenue drivers'&&<>
        <SectionHead title="Revenue planning drivers" desc="Annual sales volume × unit price → selected revenue planning account" action={<Button size="sm" variant="outline" icon={Plus} disabled={!writeable} onClick={()=>addRow('revenueDrivers')}>Add stream</Button>}/>
        <div className="table-scroll"><table><thead><tr><th>Revenue stream</th><th>Account</th><th>Annual units</th><th>Price / unit</th><th>Annual planned revenue</th></tr></thead><tbody>{data.revenueDrivers.map(r=><tr key={r.id}><td><input className="cell-input cell-wide" value={r.name} disabled={!writeable} onChange={e=>changeText('revenueDrivers',r.id,'name',e.target.value)}/></td><td><select className="cell-select" disabled={!writeable} value={r.account} onChange={e=>changeText('revenueDrivers',r.id,'account',e.target.value)}>{ACCOUNTS.filter(a=>a.type==='revenue').map(a=><option key={a.id} value={a.id}>{a.id} · {a.name}</option>)}</select></td><td><input type="number" className="cell-input" min="0" disabled={!writeable} value={r.units} onChange={e=>updateField('revenueDrivers',r.id,'units',e.target.value)}/></td><td><input type="number" className="cell-input" min="0" disabled={!writeable} value={r.price} onChange={e=>updateField('revenueDrivers',r.id,'price',e.target.value)}/></td><td className="strong-td">{money(r.units*r.price)}</td></tr>)}</tbody></table></div>
        <div className="model-footer"><div><strong>Modelled annual revenue: {money(plannedRevenue)}</strong><small>Working budget revenue: {money(ACCOUNTS.filter(a=>a.type==='revenue').reduce((t,a)=>t+annual(data.budgets[a.id]),0))}</small></div><Button icon={Save} disabled={!writeable} onClick={()=>apply('revenueDrivers')}>Apply to working budget</Button></div>
      </>}
      {tab==='Headcount plan'&&<>
        <SectionHead title="Workforce / headcount planning" desc="Full-time equivalents × average annual cost; illustrative and limited to mapped people-cost accounts" action={<Button size="sm" variant="outline" icon={Plus} disabled={!writeable} onClick={()=>addRow('headcountPlans')}>Add team</Button>}/>
        <div className="table-scroll"><table><thead><tr><th>Team</th><th>Department</th><th>People-cost account</th><th>FTEs</th><th>Cost / FTE</th><th>Annual cost</th></tr></thead><tbody>{data.headcountPlans.map(r=><tr key={r.id}><td><input className="cell-input cell-wide" value={r.name} disabled={!writeable} onChange={e=>changeText('headcountPlans',r.id,'name',e.target.value)}/></td><td><select className="cell-select" disabled={!writeable} value={r.department} onChange={e=>changeText('headcountPlans',r.id,'department',e.target.value)}>{DEPTS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></td><td><select className="cell-select" disabled={!writeable} value={r.account} onChange={e=>changeText('headcountPlans',r.id,'account',e.target.value)}>{ACCOUNTS.filter(a=>a.type==='expense').map(a=><option key={a.id} value={a.id}>{a.id} · {a.name}</option>)}</select></td><td><input className="cell-input" type="number" min="0" value={r.fte} disabled={!writeable} onChange={e=>updateField('headcountPlans',r.id,'fte',e.target.value)}/></td><td><input className="cell-input" type="number" min="0" value={r.avgCost} disabled={!writeable} onChange={e=>updateField('headcountPlans',r.id,'avgCost',e.target.value)}/></td><td className="strong-td">{money(r.fte*r.avgCost)}</td></tr>)}</tbody></table></div><div className="model-footer"><div><strong>Total FTE: {data.headcountPlans.reduce((s,r)=>s+r.fte,0)}</strong><small>Aggregate annual people costs: {money(plannedPeople)}</small></div><Button icon={Save} disabled={!writeable} onClick={()=>apply('headcountPlans')}>Apply to working budget</Button></div>
      </>}
      {tab==='Capital expenditure'&&<>
        <SectionHead title="Capital investment requests" desc="Capture project amounts and map proposals to CapEx planning accounts" action={<Button size="sm" variant="outline" icon={Plus} disabled={!writeable} onClick={()=>addRow('capexProjects')}>Add project</Button>}/>
        <div className="table-scroll"><table><thead><tr><th>Capital project</th><th>Department</th><th>CapEx account</th><th>Annual budget</th><th>Status</th><th>Request approval</th></tr></thead><tbody>{data.capexProjects.map(r=><tr key={r.id}><td><input className="cell-input cell-wide" value={r.name} disabled={!writeable} onChange={e=>changeText('capexProjects',r.id,'name',e.target.value)}/></td><td><select className="cell-select" value={r.department} disabled={!writeable} onChange={e=>changeText('capexProjects',r.id,'department',e.target.value)}>{DEPTS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></td><td><select className="cell-select" value={r.account} disabled={!writeable} onChange={e=>changeText('capexProjects',r.id,'account',e.target.value)}>{ACCOUNTS.filter(a=>a.type==='capex').map(a=><option key={a.id} value={a.id}>{a.id} · {a.name}</option>)}</select></td><td><input type="number" className="cell-input" value={r.amount} min="0" disabled={!writeable} onChange={e=>updateField('capexProjects',r.id,'amount',e.target.value)}/></td><td><Status value={r.status}/></td><td><button className="table-link" disabled={!writeable} onClick={()=>{assignApproval(`CapEx project: ${r.name}`,r.amount,'CapEx');inform('CapEx request sent for simulated approval.')}}>Submit</button></td></tr>)}</tbody></table></div><div className="model-footer"><div><strong>Total CapEx: {money(plannedCapex)}</strong><small>Amounts are annual and distributed evenly when applied.</small></div><Button icon={Save} disabled={!writeable} onClick={()=>apply('capexProjects')}>Apply to working budget</Button></div>
      </>}
      {tab==='Operating costs'&&<><SectionHead title="Operating expense model" desc="Editable OpEx account lines are managed in Department Budgets to avoid duplicate financial records."/><div className="table-scroll"><table><thead><tr><th>Account</th><th>Department</th><th>Annual OpEx</th><th>Model state</th></tr></thead><tbody>{ACCOUNTS.filter(a=>a.type==='expense').map(a=><tr key={a.id}><td className="strong-td">{a.id} · {a.name}</td><td>{DEPTS.find(d=>d.id===a.dept)?.name}</td><td>{money(annual(data.budgets[a.id]))}</td><td><Badge>Shared budget row</Badge></td></tr>)}</tbody></table></div></>}
      <div className="form-note"><Info size={16}/> Applying a model overwrites only its mapped account rows in the **working** FY2027 budget. There is no real cost allocation solver, depreciation, payroll tax, revenue recognition or approval control in this illustration.</div>
    </Card>
  </>
}
