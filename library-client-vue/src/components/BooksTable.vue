<script setup>
// defineProps({
//   books: {
//     type: Array,
//     required: true
//   }

import { ref, watch } from 'vue';

// })
const props = defineProps(['books', 'setSelectedBook', 'setShowBookHistoryModal'])
const selectedBook = ref(null);
// const bookList = computed( ()=> props.books);

watch(selectedBook, (id)=>{
  props.setSelectedBook( props.books.find(b=> b._id == id) )
})



const onSelect = (id)=>{
  props.setSelectedBook(props.books.find(b=> b._id == id))
  props.setShowBookHistoryModal(true);
}


</script>

<template>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">  </th>
            <th scope="col">Title</th>
            <th scope="col">ISBN</th>
            <th scope="col">Publish Year</th>
            <th scope="col">Cover Price</th>
            <th scope="col">Status</th>
            <th scope="col">Checkout Details</th>
            <th scope="col">History</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in props.books">
            <th scope="row"> <input type="radio" name="book" :checked="selectedBook==book._id" :value="book._id" v-model="selectedBook" />  </th>
            <td>{{ book.title }}</td>
            <td>{{ book.isbn }}</td>
            <td>{{ book.publishYear }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.checkedOut ? 'Checked Out' : 'Available' }}</td>
            <td> {{ book.checkedOut ? book.checkedOutBy : '-'  }} </td>
            <td> <button @click="onSelect(book._id)" class="btn btn-primary">View</button> </td>
          </tr>

        </tbody>
      </table>
</template>