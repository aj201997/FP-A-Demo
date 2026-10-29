import React, {useState,useEffect,useMemo} from 'react';
import { X, Boxes, Activity } from 'lucide-react';
import {makeSeed,ACCOUNTS,DEPTS,MONTHS,money,num,pct,annual,total,depTotal,clone} from '../data';
export function Card({children,className='',...rest}){return <div className={'card '+className} {...rest}>{children}</div>}

export function Badge({children,tone='neutral'}){return <span className={'badge badge-'+tone}>{children}</span>}

export function Status({value}){const t=['Approved','Published','Funded','On track','Resolved'].includes(value)?'success':['Pending','Submitted','In Review','Monitoring','Due diligence'].includes(value)?'warning':['Rejected','At risk'].includes(value)?'danger':'neutral'; return <Badge tone={t}>{value}</Badge>}

export function Button({children,variant='primary',size='',icon:Icon,loading=false,...props}){return <button className={`btn btn-${variant} ${size==='sm'?'btn-sm':''}`} {...props}>{Icon&&<Icon size={15}/>} {children}</button>}

export function Empty({title='Nothing here yet',detail='Create an item to get started.'}){return <div className="empty"><div className="empty-icon"><Boxes size={23}/></div><strong>{title}</strong><span>{detail}</span></div>}

export function PageTitle({title,desc,actions}){return <div className="page-heading"><div><div className="eyebrow">FINANCIAL PLANNING / {title.toUpperCase()}</div><h1>{title}</h1><p>{desc}</p></div>{actions&&<div className="heading-actions">{actions}</div>}</div>}

export function Kpi({label,value,delta,icon:Icon,tone='blue',hint}){return <div className="kpi"><div className="kpi-top"><span>{label}</span><span className={'kpi-icon '+tone}>{Icon?<Icon size={17}/>:<Activity size={17}/>}</span></div><div className="kpi-value">{value}</div><div className="kpi-foot">{delta&&<span className="kpi-delta">{delta}</span>}{hint&&<span>{hint}</span>}</div></div>}

export function SectionHead({title,desc,action}){return <div className="section-head"><div><h2>{title}</h2>{desc&&<p>{desc}</p>}</div>{action}</div>}

export function Progress({value=0,tone=''}){return <div className={'progress '+tone}><span style={{width:`${Math.min(100,Math.max(0,value))}%`}}/></div>}

export function Select({label,value,onChange,options,className=''}){return <label className={'field '+className}>{label&&<span>{label}</span>}<select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=>typeof o==='string'?<option key={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select></label>}

export function Field({label,value,onChange,type='text',placeholder='',min,step,required=false}){return <label className="field"><span>{label}</span><input required={required} type={type} value={value} placeholder={placeholder} min={min} step={step} onChange={e=>onChange(type==='number'?e.target.value:e.target.value)}/></label>}

export function TextArea({label,value,onChange,placeholder=''}){return <label className="field"><span>{label}</span><textarea rows="3" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}/></label>}

export function Modal({title,sub,children,onClose,wide=false}){return <div className="modal-backdrop" onMouseDown={onClose}><div className={'modal '+(wide?'modal-wide':'')} onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div><button className="icon-btn" onClick={onClose}><X size={18}/></button></div><div className="modal-body">{children}</div></div></div>}

export function Tabs({tabs,value,onChange}){return <div className="tabs">{tabs.map(t=><button key={t} className={'tab '+(value===t?'active':'')} onClick={()=>onChange(t)}>{t}</button>)}</div>}

export function DotChart({values,labels=MONTHS,kind='bar',highlight=9}){const max=Math.max(1,...values.map(v=>Number(v)||0));return <div className={'chart '+(kind==='small'?'chart-small':'')}>{values.map((v,i)=><div className="chart-col" key={i}><div className="chart-bar-wrap"><div className={'chart-bar '+(i>=highlight?'future':'')} style={{height:`${Math.max(5,(Number(v)||0)/max*100)}%`}} title={`${labels[i]}: ${num(v)}`}/></div><span>{labels[i]}</span></div>)}</div>}

export function useLocal(){const [state,setState]=useState(()=>{try{const saved=localStorage.getItem('entroid-fpa-demo-v2');return saved?JSON.parse(saved):makeSeed()}catch{return makeSeed()}});useEffect(()=>{try{localStorage.setItem('entroid-fpa-demo-v2',JSON.stringify(state))}catch{}},[state]);return [state,setState]}

export function exportCSV(headers,rows,name){const escape=v=>'"'+String(v??'').replaceAll('"','""')+'"';const body=[headers,...rows].map(row=>row.map(escape).join(',')).join('\n');const u=URL.createObjectURL(new Blob([body],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download=name;a.click();URL.revokeObjectURL(u)}

export const today=()=>new Date().toISOString().slice(0,10);
export const rand=()=>Math.random().toString(36).slice(2,8).toUpperCase();
