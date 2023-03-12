<script setup>
import {ref} from 'vue';
import moment from 'moment';
import {dateAfterBusinessDays, isValidPhone, isValidID, notifyError, notifySuccess} from '@/utils/functions';
import {checkOutBook} from '@/utils/api/books';

const props = defineProps(['show', 'setShow', 'book', 'markBookAsBorrowed']);

const name = ref('');
const phone = ref();
const nationalID = ref();
const checkoutData = ref(moment().format('YYYY-MM-DD'));
const checkinDate = ref( moment(dateAfterBusinessDays(15)).format('YYYY-MM-DD') );



const close = ()=>{
    props.setShow(false)
}

const onSubmit = ()=>{
    const data = {
        borrowerName: name.value,
        phone: phone.value,
        nationalId: nationalID.value,
        dateOfReturn: checkinDate.value,
        dateOfCheckout: checkoutData.value,
        book_id: props.book?._id
    }
    if(!(isValidPhone(data.phone))){
        return notifyError('Enter valid phone number');
    }
    if(!(isValidID(data.nationalId))){
        return notifyError('Enter valid 11 digit National ID');
    }
    for(let key in data){
        if(! data[key]){
            return notifyError(` ${key} field is required`);
        }
    }

    checkOutBook(data)
    .then(response=>{
        if(response.book){
            close();
            props.markBookAsBorrowed(response.book._id, data.borrowerName);
        }
    })
}

</script>

<template>
    <div id="exampleModalCenter" :class="`modal fade ${show? 'show' :''}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" :style="`padding-right: 17px; display: ${show? 'block' :'none'}; background: rgba(0,0,0,0.4);`">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Checkout</h5>
              <span @click="close" class="cross" aria-hidden="true">&times;</span>
            </div>
            <div class="modal-body">
                <div class="mb-4">
                    Book Title: <span class="font-bold">{{ props.book?.title }}</span>
                </div>
                <form>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input v-model="name" type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                      <label for="name">National ID #</label>
                      <input v-model="nationalID" type="number" class="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter ID #">
                    </div>
                    <div class="form-group">
                      <label for="name">Phone #</label>
                      <input v-model="phone" type="number" class="form-control" id="phone" aria-describedby="emailHelp" placeholder="Enter Phone #">
                    </div>
                    <div class="form-group">
                      <label for="name">Checkout Date</label>
                      <input v-model="checkoutData" type="date" class="form-control" id="checkout-date" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                      <label for="name">Check-in Date</label>
                      <input v-model="checkinDate" type="date" class="form-control" id="checkin-date" aria-describedby="emailHelp">
                    </div>
                </form>

            </div>
            <div class="modal-footer">
              <button @click="onSubmit" type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>
.cross{
    font-size:28px;
    font-weight: bold;
    cursor: pointer;
}
.font-bold{
    font-weight: bold;
}
.form-group{
    padding-top:8px;
}

.form-group label{
    font-weight: bold;
}

</style>