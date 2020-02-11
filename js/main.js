let switchSort = new Vue({
  el: '#radioButtonBlock',
  data: {
    sorts: [
      {id: 1, name: "Сортировка по номерам"},
      {id: 2, name: "Сортировка по номерам в обратном порядке"},
      {id: 3, name: "Сортировка по алфавиту"},
      {id: 4, name: "Сортировка в обратном алфавитном порядке"}
    ],
    selectedSort: {id: 1, name: "Сортировка по номерам"}
  },
  methods: {
    checkedChanged: function(){
      outElement.sortItems(this.selectedSort.id);
    }
  }
})

let outElement = new Vue({
  el: '#listItems',
    data: {
    items: [],
    sortId: 1
  },
  methods: {
    addItem: function(value){
      let maxIndex = 0;
      this.items.forEach((item) => {
        if(item.id > maxIndex) maxIndex = item.id;
    });
      maxIndex+=1;
      this.items.push({id: maxIndex, value: value, editValue: value, show: true});
      this.sortItems(switchSort.selectedSort.id);
    },
    editItem: function(id){
      this.items.forEach((item) => {
        if(id == item.id){
          item.show = true;
          item.value = item.editValue;
        }
      });
      this.sortItems(switchSort.selectedSort.id);
    },
    closeEditItem: function(id){
      this.items.forEach((item) => {
        if(id == item.id){
          item.show = true;
          item.editValue = item.value
        }
      });
    },
    deleteItem: function(id){
      this.items.forEach((item, index) => {
        if(id == item.id){
          console.log(index);
          this.items.splice(index,1);
        }
      });
    },
    sortItems: function(sortId){
      if(!sortId || sortId > 4 || sortId < 1) sortId = 1;
      let comparer;
      if(sortId == 1)
        comparer = function(a, b) {
          if (a.id < b.id)
            return -1;
          if (a.id > b.id)
            return 1;
          return 0;
        }
      if(sortId == 2)
        comparer = function(a, b) {
          if (a.id > b.id)
            return -1;
          if (a.id < b.id)
            return 1;
          return 0;
        }
      if(sortId == 3)
        comparer = function(a, b) {
          if (a.value < b.value)
            return -1;
          if (a.value > b.value)
            return 1;
          return 0;
        }
      if(sortId == 4)
        comparer = function(a, b) {
          if (a.value > b.value)
            return -1;
          if (a.value < b.value)
            return 1;
          return 0;
        }
      this.items.sort(comparer);
    }
  }
})

new Vue({
  el: '#addBlock',
  data:{
    text: ""
  },
  methods: {
    addItem: function (event) {
      if(this.text.length > 0){
        outElement.addItem(this.text);
        this.text = "";
      }
    }
  }
})