import {postRequest, getRequest, notifyError, notifySuccess}  from '@/utils/functions'
import endpoints from '@/utils/api/endpoints'


export const getBooks = async ()=>{
    const url = endpoints.getBooks
    try{

        let response = await getRequest(url)
        if(response.success){
            // notifySuccess(response?.message)
            return response.data
        }
        notifyError(response?.message)
        return response?.data
    }catch(e){
        notifyError(e?.toString())
        return null
    }
    
}
export const checkOutBook = async (data)=>{
    const url = endpoints.checkOutBook
    try{

        let response = await postRequest(url, data)
        if(response.success){
            notifySuccess(response?.message)
            return response.data
        }
        notifyError(response?.message)
        return response?.data
    }catch(e){
        notifyError(e?.toString())
        return null
    }
    
}
export const checkInBook = async (id)=>{
    const url = endpoints.checkInBook
    try{

        let response = await postRequest(url, {book_id: id})
        if(response.success){
            notifySuccess(response?.message)
            return response.data
        }
        notifyError(response?.message)
        return response?.data
    }catch(e){
        notifyError(e?.toString())
        return null
    }
    
}
export const checkInHistoryBook = async (id)=>{
    const url = endpoints.checkInHistoryBook
    try{

        let response = await postRequest(url, {book_id: id})
        if(response.success){
            return response.data
        }
        notifyError(response?.message)
        return response?.data
    }catch(e){
        notifyError(e?.toString())
        return null
    }
    
}
