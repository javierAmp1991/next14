'use client'
import Request from "./request";

export default function Page({params}:{params: {id: string}}){return (<Request id={params.id}/>)}