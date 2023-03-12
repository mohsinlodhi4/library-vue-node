<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import Navbar from '@/components/Navbar.vue';
import BooksTable from '@/components/BooksTable.vue';
import CheckOutModal from '@/components/CheckOutModal.vue';
import CheckInModal from '@/components/CheckInModal.vue';
import BookHistoryModal from '@/components/BookHistoryModal.vue';
import { getBooks, checkOutBook } from '@/utils/api/books';
import { notifyError, notifySuccess, getUser } from '../utils/functions';

const books = ref([]);
const selectedBook = ref(null);
const showCheckoutModal = ref(false);
const showCheckinModal = ref(false);
const showBookHistoryModal = ref(false);


const setSelectedBook  = (book) => {
  selectedBook.value = book
};
const setShowCheckoutModal = (show) => showCheckoutModal.value = show; 
const setShowCheckinModal = (show) => showCheckinModal.value = show; 
const setShowBookHistoryModal = (show) =>  showBookHistoryModal.value = show; 
const user = getUser();

const showCheckIn = computed(()=> selectedBook.value &&  selectedBook.value.checkedOutByUser == user._id  )
watch(books, (newBooks)=>{
  if(selectedBook.value){
    selectedBook.value = newBooks.find(b => b._id == selectedBook.value._id);
  }
})

onMounted(()=>{
  getBooks()
  .then(data=>{
    books.value = data.books
  })

})

const onCheckin = ()=>{
  if(!selectedBook.value){
    notifyError('Please select a book first')
    return;
  }
  if(!selectedBook.value.checkedOut){
    notifyError(`Book hasn't been checked out`)
    return;
  }
  setShowCheckinModal(true);
}
const onCheckout = ()=>{
  console.log(selectedBook.value);
  if(!selectedBook.value){
    notifyError('Please select a book first')
    return;
  }
  if(selectedBook.value.checkedOut){
    notifyError(`Book is already checked out By ${selectedBook.value.checkedOutBy}`)
    return;
  }
  setShowCheckoutModal(true);
}

const markBookAsBorrowed = (id, name)=>{
  let newBooks = books.value.map(el=> {
    if(el._id== id){
      el.checkedOut = true;
      el.checkedOutByUser = user._id;
      el.checkedOutBy = name;
    }
    return el;
  });
  books.value = newBooks;
}
const markBookAsReturned = (id)=>{
  let newBooks = books.value.map(el=> {
    if(el._id== id){
      el.checkedOut = false;
      el.checkedOutByUser = null;
      el.returnedOn = new Date();
    }
    return el;
  });

  books.value = newBooks;
}


</script>

<template>
  <main >
    <Navbar />
    <div class="container mt-4">
      <div class="row mb-2">
        <div class="col-8">
          <h3>Books List</h3>
        </div>
        <div class="col-4">

          <button v-if="showCheckIn" @click="onCheckin" :disabled="!selectedBook" class="btn btn-lg btn-success"> <strong> Check-In </strong> </button>
          <button v-else @click="onCheckout" :disabled="!selectedBook" class="btn btn-lg btn-warning"> <strong> Checkout </strong> </button>
        </div>
      </div>
      <BooksTable :books="books" :setSelectedBook="setSelectedBook" :setShowBookHistoryModal="setShowBookHistoryModal" />
      
      <CheckOutModal v-if="selectedBook" :setShow="setShowCheckoutModal" :show="showCheckoutModal" :book="selectedBook" :markBookAsBorrowed="markBookAsBorrowed" />
      
      <CheckInModal v-if="selectedBook" :setShow="setShowCheckinModal" :show="showCheckinModal" :book="selectedBook" :markBookAsReturned="markBookAsReturned" />
      
      <BookHistoryModal v-if="selectedBook && showBookHistoryModal" :setShow="setShowBookHistoryModal" :show="showBookHistoryModal" :book="selectedBook"  />



    </div>
  </main>
</template>
