# RN-

import React, { Component } from 'react'
import { Text, View,FlatList, Button ,Image} from 'react-native'

export default class FlatListDeom extends Component {


    constructor(props){
        super(props)
        this.max=7
        this.state={data:[],albums:[]}
    }
    componentDidMount(){
        //rest api, GET|DELETE|PUT|PATCH|POST(查询|删除|整体更新|局部更新|添加)
        fetch("http://www.cjlly.com:3041/record",{method:"GET"})//前面字符串url，后面对象option
        .then(resp=>resp.json())
        .then(albums=>this.setState({albums}))
    }
    _delete=(item)=>{
        let data=this.state.data.splice(0)
        let index=data.indexOf(item)
        data.splice(index,1)
        this.setState({data})
    }
    _renderItem=({item,index})=>{
        return (
            <View style={{height:160,justifyContent:"space-between"}}>
                <Text>{item.name}</Text>
                <Image style={{width:100,height:100}} source={{uri:item.img}}/>
                <Button onPress={()=>this._delete(item)} title="xxxx"/>
            </View>
        )
    }
    _ItemSeparatorComponent=()=>{
        return <View style={{height:1,backgroundColor:'red'}}></View>
    }
    _refresh=()=>{
        let temp=Math.floor(Math.random()*100+100)
        let data=this.state.data.splice(0)
        data.unshift(temp)
        this.setState({data:data})
    }
    _endReached=()=>{
        let data=this.state.data.splice(0)
        data.push(++this.max)
        this.setState({data})
    }
    
    render() {
        return (
            <View>
                //axios
                <Button onPress={this._ajax} title="ajax"/>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text>你的订单不存在</Text>}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    refreshing={false}
                    onRefresh={this._refresh}
                    onEndReachedThreshold={0,2}
                    onEndReached={this._endReached}
                />
            </View>
        )
    }
}
