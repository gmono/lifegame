export function randint(max: number) {
    return Math.floor(Math.random() * max) % max;
}



export async function delay(mis){
    return new Promise<void>((resolve)=>{
        setTimeout(() => {
            resolve();
        }, mis);
    })   
}


//仿python基础设施
export function *range(start:number,space?:number,end?:number):Iterable<number>{
    //允许 range(a,c,b) range(b) range(a,b)
    if(space==null&&end==null){
        //1
        yield* range(0,1,start);
    }
    else if(end==null){
        //2
        yield* range(start,1,space);
    }
    else{
        //3
        for(let i=start;i<end;i+=space){
            yield i;
        }
    }
}

export function* enumerate<T>(arraylike:Iterable<T>):Iterable<[number,T]>{
    let now=0;
    for(let a of arraylike){
        yield [now++,a]
    }
}

export function any(arraylike:Iterable<any>)
{
    for(let a of arraylike){
        if(a) return true;
    }
    return false;
}
export function all(arraylike:Iterable<any>)
{
}

export function print(data:any){
    console.log(data);
}
export function *zip(...arraylikes:Iterable<any>[]){
    let itors=arraylikes.map(v=>v[Symbol.iterator]());
    for(;;){
        //对所有itor取next 如果全部成功则yield 否则返回
        let ress=itors.map(v=>v.next());
        // print(ress);
        //如果有一个结束
        if(any(ress.map(v=>v.done))){
            //返回
            return undefined;
        }
        else yield ress.map(v=>v.value);
    }
}
//基本操作
export function shuffle<T>(arl:Iterable<T>):T[]{
    let a=list(arl);
    let r=new Array(len(a));
    for(let t of a){
        //随机填空
        let idx=randint(len(a));
        r[idx]=t;
    }
    return r;
}
export function sorted<T>(arl:Iterable<T>,key:(v:T)=>number=null){
    let ret=list(arl).sort((a,b)=>{
        let [k,kk]=[key(a),key(b)]
        return k-kk;
    })
    return ret;
}
export function byIdx<T>(arl:Iterable<T>,idxs:number[]){
    let l=list(arl);
    let ret=idxs.map(v=>l[v]);
    return ret;
}
//不放回采样
export function extract<T>(arl:Iterable<T>,count:number):T[]{
    //从一个列表中采样 不放回
    let a=list(arl);
    let idx=shuffle(range(len(a))).slice(0,count);
    print(idx);
    return byIdx(a,idx);
}
//有放回采样
export function sample<T>(arl:Iterable<T>,count:number):T[]{
    //从一个列表中采样 有放回
    let a=list(arl);
    let idx=list(range(len(a))).map(v=>randint(len(a)));
    return byIdx(a,idx);
}
//数学
export let min=Math.min;
export let max=Math.max;

/**
 * 插入
 * @param arl 数组
 * @param point 插入位置 插入到这个位置的元素前面 为 0-len(arl) 的值
 * @param val 插入值
 */
export function insert<T>(arl:Iterable<T>,point:number,val:T):T[]{
    let newar=[]
    let a=list(arl);
    a.forEach((v,idx)=>{
        if(point==idx) newar.push(val);
        newar.push(v);
    });
    if(len(a)==point) newar.push(val);
    return newar;
}

//基本数据
interface AsInt{
    toInt():number;
}
interface AsFloat{
    toFloat():number;
}
export function int(other:string|number|AsInt){
    if(typeof other=="string") return parseInt(other);
    else if(typeof other=="number") return other|0;
    else if("toInt" in other){
        return other.toInt()
    }else return 0;
}
export function str(n){
    return new Number(n).toString();
}
export function float(other:string|number|AsFloat){
    if(typeof other=="string") return parseFloat(other);
    else if(typeof other=="number") return other;
    else if("toFloat" in other){
        return other.toFloat()
    }else return 0;
}
//数据容器构造区域

export function list<T>(iter?:Iterable<T>):Array<T>{
    if(iter==null) return list([]);
    let ret=[]
    for(let a of iter){
        ret.push(a)
    }
    return ret;
}
//融合对象 

export function mapToObj(map:Map<any,any>){
    //
    let r=new Proxy<any>({},{
        get(target,p:any,receiver){
            return map.get(p);
        },
        set(target,p:any,value,receive){
            map.set(p,value);
            return true;
        },
        has(target,p:any){
            return map.has(p);
        },
        deleteProperty (target, p): boolean{
            return map.delete(p);
        },
        defineProperty (target, p, attributes: PropertyDescriptor): boolean
        {
            map.set(p,attributes.value);
            return true;
        },
        ownKeys (target): any[]
        {
            return list(map.keys());
        }
        // apply (target, thisArg: any, argArray?: any): any
        // {

        // },
        // construct (target, argArray: any, newTarget?: any): object
        // {

        // }
    })
    return r;
}
export function map<K,V>(arl:Iterable<[K,V]>){
    return new Map<K,V>(arl);
}
export function set<T>(arl:Iterable<T>)
{
    return new Set<T>(arl);
}

//数据操作
export function *keys<K=any,V=any>(obj:object|Map<K,V>)
{
    //取对象的key或map的所有key 枚举
    if(obj instanceof Map){
        //枚举
        for(let a of obj.keys()){
            yield a;
        }
    }
    else if(typeof obj =="object"){
        for(let k in obj){
            yield k;
        }
    }
}

type HasLength={length:number}|{size:number}|{count:number}|{__len__():number};
//以下为调用协议
export function len(obj:Iterable<any>|HasLength|object){
    if("length" in obj){
        return obj.length
    }else if ("size" in obj){
        return obj.size;
    }else if("count" in obj){
        return obj.count;
    }else if("__len__" in obj){
        return obj.__len__()
    }else if(typeof obj=="object"){
        let sum=0;
        for(let k in obj){
            sum++;
        }
        return sum;
    }

}

// //类型函数把一个类型映射为另一个类型
// //对象映射函数，把一个对象中的每个属性使用一个mapper映射
// //递归对象映射函数，把一个对象中的所有非对象属性使用mapper映射，对象递归映射
// type Mapper<A,B>=[A,B];
// type MapTo<T extends Mapper<any,any>,C>=C extends T[0]? T[1]:never;
// type Switch<T, U extends any> =
//     T extends keyof U ? U[T] : U["default"];

// // 获取第一个元素
// export type Head<T> = T extends { 0: infer H } ? H : never;
// // 移除第一个元素
// export type Tail<T> = (
//     (...a: T extends any[] ? T : never) => void
// ) extends (a: any, ...b: infer R) => void ? R : never;
// export type Unshift<T, A> = (
//     (a: A, ...b: T extends any[] ? T : never) => void
// ) extends (...a: infer R) => void ? R : never;
// // 在尾部加入一个元素
// export type Copy<T, S extends any> = { [P in keyof T]: S[P] };
// export type Push<T, A> = Copy<Unshift<T, any>, T & Record<string, A>>;



// type MultiMapTo<T extends any[],C,k="stuff">=T["length"] extends 0? MapTo<T[0],C>:
//                                                 C extends T[0][0]? T[0][1]:Switch<k,{
//                                                     stuff:MultiMapTo<Tail<T>,C,k>
//                                                 }>;

// type ObjectTypeMap<C extends Mapper<any,any>[],T extends object>={[P in keyof T]:MultiMapTo<C,T[P]>};

// //实现递归性 尚未实现
// type ObjectMapper<T extends object,C extends Mapper<any, any>[]>=[T,ObjectTypeMap<C,T>]

// type s=[[number,string],[string,number],ObjectMapper<object,s>];
// type o={
//     a:string,
//     b:number,
//     c:{
//         d:string,
//         e:number
//     }
// };
// type r=ObjectTypeMap<s,o>;


// //值化类型定义

// //类型判断用
// type TypeRep<T,V=string>={
//     value:V,
//     type:T
// };
// //程序用的
// let type_array="array";
// let type_number="number";
// let type_string="string";
// //值部分

// function getarray<T>(value:T):TypeRep<"array",T>{
//     return {
//         value:value,
//         type:"array"
//     }
// }
// function getnumber<T>(value:T):TypeRep<"number",T>{
//     return {
//         value:value,
//         type:"number"
//     }
// }
// function getstring<T>(value:T):TypeRep<"string",T>{
//     return {
//         value:value,
//         type:"string"
//     }
// }
// //映射部分
// //映射器
// type RepMap<A,B>=Mapper<TypeRep<A>,B>;
// //类型映射器
// type RepMappers=[RepMap<"string",string>,
//                 RepMap<"number",number>,
//                 RepMap<"array",any[]>]

// //映射rep类型到正常类型
// type Extract<Rep>=MultiMapTo<RepMappers,Rep>;
// //映射model 到 parse后类型
// type MapModel<ModelType extends {[P in keyof ModelType]:TypeRep<any>}>=ObjectTypeMap<RepMappers,ModelType>

// let model={
//     title:getstring(".title"),
//     list:getarray(".array")
// }
// type a=MapModel<typeof model>;
// function parse(body,model:object):MapModel<typeof model>{
//     return null;
// }
