<script setup>
import {ref, onMounted} from 'vue';
import moment from 'moment';
import {dateAfterBusinessDays, isValidPhone, isValidID, notifyError, notifySuccess} from '@/utils/functions';
import {checkInHistoryBook} from '@/utils/api/books';

const props = defineProps(['show', 'setShow', 'book']);
const bookHistory = ref([]);

const close = ()=>{
    props.setShow(false)
}




onMounted(()=>{
    checkInHistoryBook(props.book._id)
    .then(data=>{
        bookHistory.value = data.bookHistory;
    });
}
);


</script>

<template>
    <div id="exampleModalCenter" :class="`modal fade ${show? 'show' :''}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" :style="`padding-right: 17px; display: ${show? 'block' :'none'}; background: rgba(0,0,0,0.4);`">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Book Check-In History</h5>
              <span @click="close" class="cross" aria-hidden="true">&times;</span>
            </div>
            <div class="modal-body">
                <div class="mb-4">
                    Book Title: <span class="font-bold">{{ props.book?.title }}</span>
                </div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Borrower</th>
                        <th scope="col">Checkout Date</th>
                        <th scope="col">Check In Date</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="book in bookHistory">
                        <td>{{ book.borrowerName }}</td>
                        <td>{{ moment(book.dateOfCheckout).format('YYYY-MM-DD') }}</td>
                        <td>{{ book.returnedOn ?  moment(book.returnedOn).format('YYYY-MM-DD') : moment(book.dateOfReturn).format('YYYY-MM-DD') }}</td>
                        <td>{{ book.returnedOn ? 'Returned' : 'Borrowed' }}</td>
                      </tr>
            
                    </tbody>
                  </table>
                <!-- <form>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input disabled="true" :value="props.book?.checkedOutBy" type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                      <label for="name">National ID #</label>
                      <input disabled="true" :value="props.book?.checkedOutByNationalId" type="number" class="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter ID #">
                    </div>
                    <div class="form-group">
                      <label for="name">Phone #</label>
                      <input disabled="true" :value="props.book?.checkedOutByPhone" type="number" class="form-control" id="phone" aria-describedby="emailHelp" placeholder="Enter Phone #">
                    </div>
                    <div class="form-group">
                      <label for="name">Checkout Date</label>
                      <input disabled="true" :value="moment(props.book?.checkedOutByCheckOutDate).format('YYYY-MM-DD')" type="date" class="form-control" id="checkout-date" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                      <label for="name">Check-in Date</label>
                      <input disabled="true" :value="moment(new Date()).format('YYYY-MM-DD')" type="date" class="form-control" id="checkin-date" aria-describedby="emailHelp">
                    </div>
                </form> -->

            </div>
            <div class="modal-footer">
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