<template>
  <div
    class="flex flex-row w-full h-screen lg:w-screen70 lg:h-screen90 mx-auto lg:mt-8 bg-white"
    @click="menuToggled === true ? (menuToggled = false) : null"
  >
    <div
      class="w-full md:w-1/3 bg-white shadow-md border-2 flex flex-col overflow-x-scroll"
    >
      <div
        class="head px-4 py-2 bg-gray-200 flex flex-row justify-between relative"
      >
        <img
          src="../assets/propic.jpg"
          alt="myPic"
          class="h-12 w-12 rounded-full"
        />
        <div class="p-4 block">
          <i
            class="fas fa-circle-notch ml-6 cursor-pointer fill-current text-gray-600"
          ></i>
          <i
            class="fas fa-comment-alt ml-6 cursor-pointer fill-current text-gray-600"
          ></i>
          <i
            class="fas fa-ellipsis-v ml-6 cursor-pointer fill-current text-gray-600"
            @click.stop="menuToggled = true"
          ></i>
        </div>

        <div
          v-if="menuToggled"
          class="bg-white absolute top-14 right-0 min-w-48 border-2 absolute z-10 w-1/2 p-2 rounded-lg shadow-lg transition-all duration-500 ease-in-out"
          id="menu"
        >
          <p
            v-for="menu in menus"
            v-bind:key="menu"
            class="text-xl hover:bg-gray-200 p-2"
          >
            {{ menu }}
          </p>
        </div>
      </div>
      <div class="bg-gray-50 bg-gray-100 h-14 p-2 relative">
        <input
          class="w-full rounded-full h-11 m-auto pl-12"
          type="text"
          v-model="search"
        />
        <i
          class="fa fa-search absolute left-6 top-6 fill-current text-gray-600 hover:text-blue-500"
          aria-hidden="true"
        ></i>
      </div>
      <div v-if="search == ''">
        <div
          v-for="contact in contacts"
          v-bind:key="contact.name"
          class="flex flex-row px-6 py-2 hover:bg-gray-100 border-b border-gray-100 rounded-lg"
          @mouseover="contact.hover = true"
          @mouseleave="contact.hover = false"
          v-on:click="fetchSelectedPerson(contact.name)"
        >
          <img
            :src="`${contact.picture}`"
            alt="avatar"
            class="h-12 w-12 mr-6 rounded-full m-2"
          />
          <!-- http://localhost:3000/src/assets/contact/2.png -->
          <div>
            <p class="text-2xl">{{ contact.name }}</p>
            <p class="text-xl text-gray-500">{{ contact.message }}</p>
          </div>
          <i
            :class="`fa fa-angle-down ml-auto mt-6 ${
              !contact.hover ? `hidden` : `block`
            }`"
            aria-hidden="true"
          ></i>
        </div>
      </div>

      <div v-if="search !== ''">
        <div
          v-for="contact in showContact"
          v-bind:key="contact.name"
          class="flex flex-row px-6 py-2 hover:bg-gray-100"
          @mouseover="contact.hover = true"
          @mouseleave="contact.hover = false"
          v-on:click="fetchSelectedPerson(contact.name)"
        >
          <img
            :src="contact.picture"
            alt="avatar"
            class="h-12 w-12 mr-6 rounded-full m-2"
          />
          <!-- http://localhost:3000/src/assets/contact/2.png -->
          <div>
            <p class="text-2xl">{{ contact.name }}</p>
            <p class="text-xl text-gray-500">{{ contact.message }}</p>
          </div>
          <i
            :class="`fa fa-angle-down ml-auto mt-6 ${
              !contact.hover ? `hidden` : `block`
            }`"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>

    <div
      class="w-2/3 bg-white shadow-md border-b-8 border-green-500 hidden md:block"
    >
      <p
        class="p-5 text-center text-4xl text-gray-600 mx-auto my-auto align-middle mt-48"
        v-if="!contactSelected"
      >
        where convinience overtakes privacy
      </p>
      <div class="flex flex-col h-full" v-else>
        <div
          class="px-4 py-3 bg-gray-200 flex flex-row justify-between relative"
        >
          <div class="flex flex-row">
            <img
              :src="contactSelected.picture"
              alt="myPic"
              class="h-12 w-12 rounded-full"
            />
            <p class="text-gray-800 text-2xl ml-2 font-semibold p-2">
              {{ contactSelected.name }}
            </p>
          </div>
          <div class="flex flex-row">
            <i
              class="fa fa-search ml-6 cursor-pointer fill-current text-gray-600 p-2 text-xl"
            ></i>
            <i
              class="fas fa-ellipsis-v ml-6 cursor-pointer fill-current text-gray-600 p-2 text-xl"
            ></i>
          </div>
        </div>
        <div class="h-5/6 bg-green-200">
          <p class="text-4xl text-center mt-44">
            Spying on conversation with {{ contactSelected.name }}
          </p>
        </div>
        <div class="flex flex-row bg-gray-200 h-16 relative">
          <input
            class="w-full rounded-full h-12 m-auto ml-24 mr-12 px-12"
            type="text"
            v-model="search"
          />
          <i class="far fa-smile cursor-pointer fill-current text-gray-600 p-2 text-xl absolute left-3 top-2"></i>
          <i class="fas fa-paperclip cursor-pointer fill-current text-gray-600 p-2 text-xl absolute left-12 top-2"></i>
          <i class="fas fa-microphone cursor-pointer fill-current text-gray-600 p-2 text-xl absolute right-3 top-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  data() {
    return {
      contacts: null,
      menuToggled: false,
      search: "",
      menus: [
        "New group",
        "Create a room",
        "Profile",
        "Archived",
        "Starred",
        "Settings",
        "Log out",
      ],
      contactSelected: false,
    };
  },

  watch: {
    search: function () {
      this.showContact = null;
      let search = this.search.toLowerCase();
      let contactName = this.contacts.filter((contact) => {
        return contact.name.toLowerCase().indexOf(search) > -1;
      });
      this.showContact = contactName;
    },
  },

  mounted() {
    fetch("./contacts.json")
      .then((response) => response.json())
      .then((data) => (this.contacts = data));
  },

  methods: {
    fetchSelectedPerson: function (person) {
      this.contactSelected = this.contacts.find(
        (element) => element.name == person
      );
    },
  },
};
</script>

<style scoped>
/* Copy this @keyframes block to your CSS*/
@keyframes slideleft {
  0.0% {
  }
  100% {
  }
  50% {
    transform: translate(-5px);
  }
}

/* Add the animation: property to whichever element you want to animate */
.fa-angle-down {
  animation: slideleft 0.2s ease 0s normal none;
}

/* Copy this @keyframes block to your CSS*/
@keyframes zoom {
  0.0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

/* Add the animation: property to whichever element you want to animate */
#menu {
  animation: zoom 0.2s ease 0s;
}
</style>
