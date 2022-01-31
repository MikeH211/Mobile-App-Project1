import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { FlatList, View, Text, TextInput, Button } from "react-native"
import { Reimbursement } from "../dtos/dtos"

export default function ReimbursementsView(){

    const[reimbursements, setReimbursements] = useState<Reimbursement[]>([])

    
    useEffect(() => {
        (async () => {
            const response = await axios.get('http://53fc-2600-1702-1af0-13a0-c927-eca8-233b-763d.ngrok.io/reimbursements')
            const myReimbursements = response.data
            setReimbursements(myReimbursements)
        })()
    },[])

    return(<View>
        <FlatList data={reimbursements} renderItem={({item})=>ReimbursementItem(item)} keyExtractor={item => item.id}/>
    </View>)
}

function ReimbursementItem(props:Reimbursement){
    const [comment,setComment]= useState("")
    const [status,setStatus] = useState(props.status)
    return(<View>
        <Text>
        Date {props.requestDate} 
        Reason {props.reason} 
        Add a comment<TextInput onChangeText={c => setComment(c)} placeholder="Add comment..."/>
        Approve<Button onPress={()=>setStatus("Approved")} title="Approve"/>
        Deny<Button onPress={()=>setStatus("Denied")} title="Deny"/>
        </Text>
    </View>)
}
