<template>
  <div
    class="flex flex-row w-full h-screen lg:w-screen70 lg:h-screen90 mx-auto lg:mt-8 bg-white"
    v-on:click="
      menuToggledmain === true ? (menuToggledmain = false) : null;
      menuToggledconvo === true ? (menuToggledconvo = false) : null;
    "
  >
    <!-- v-on:click="menuToggledconvo === true ? (menuToggledconvo = false) : null" -->
    <div
      class="md:block w-full md:w-1/3 bg-white shadow-md border-2 flex flex-col overflow-x-scroll"
      :class="{ hidden: showconvo }"
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
            @click.stop="menuToggledmain = true"
          ></i>
        </div>

        <div
          v-if="menuToggledmain"
          class="bg-white absolute top-14 right-0 min-w-48 border-2 z-10 w-1/2 p-2 rounded-lg shadow-lg transition-all duration-500 ease-in-out"
          id="menumain"
        >
          <p
            v-for="menu in menusmain"
            v-bind:key="menu"
            class="hover:bg-gray-200 p-2"
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
          class="flex flex-row px-6 py-1 hover:bg-gray-100 border-b border-gray-100 rounded-lg"
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
            <p class="text-xl">{{ contact.name }}</p>
            <p class="text-gray-500">{{ contact.message }}</p>
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
            <p class="text-xl">{{ contact.name }}</p>
            <p class="text-gray-500">{{ contact.message }}</p>
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
      class="md:block w-full md:w-2/3 bg-white shadow-md border-b-8 border-green-500"
      :class="{ hidden: !showconvo }"
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
            <i
              class="fas fa-arrow-left mr-6 cursor-pointer fill-current text-gray-600 p-2 text-xl block md:hidden"
              @click="showconvo = false"
            ></i>
            <img
              :src="contactSelected.picture"
              alt="myPic"
              class="h-12 w-12 rounded-full"
            />
            <p class="text-gray-800 text-2xl ml-2 font-semibold p-2">
              {{ contactSelected.name }}
            </p>
          </div>
          <div class="flex flex-row relative">
            <i
              class="fa fa-search ml-6 cursor-pointer fill-current text-gray-600 p-2 text-xl"
            ></i>
            <i
              class="fas fa-ellipsis-v ml-6 cursor-pointer fill-current text-gray-600 p-2 text-xl"
              @click.stop="menuToggledconvo = true"
            ></i>
            <div
              v-if="menuToggledconvo"
              class="bg-white absolute top-14 right-0 min-w-48 border-2 z-10 p-2 rounded-lg shadow-lg transition-all duration-500 ease-in-out"
              id="menuconvo"
            >
              <p
                v-for="menu in menuconvo"
                v-bind:key="menu"
                class="hover:bg-gray-200 p-2 w-56"
              >
                {{ menu }}
              </p>
            </div>
          </div>
        </div>

        <!-- <p class="text-4xl text-center mt-44">
            Spying on conversation with {{ contactSelected.name }}
          </p> -->
        <div
          class="h-full bg-gray-100 px-4 py-1 inline-flex flex-col overflow-x-scroll"
        >
          <div
            v-for="(message, name) in contactSelected.messages"
            v-bind:key="message.me1"
            class="w-full"
          >
            <p
              class="float-right bg-green-200 px-4 py-2 m-2 rounded-lg block pl-auto ml-32"
              v-if="name[0] == `m`"
            >
              {{ message }}
            </p>
            <p
              class="float-left bg-white px-4 py-2 m-2 rounded-lg block pr-auto mr-32"
              v-else
            >
              {{ message }}
            </p>
          </div>
        </div>
        <div class="flex flex-row bg-gray-200 h-16 relative">
          <input
            class="w-full rounded-full h-12 m-auto md:ml-24 md:mr-12 px-12 pl-24 md:pl-6"
            type="text"
          />
          <i
            class="far fa-smile cursor-pointer fill-current text-gray-600 p-2 text-xl absolute left-3 top-2 md:block"
          ></i>
          <i
            class="fas fa-paperclip cursor-pointer fill-current text-gray-600 p-2 text-xl absolute left-12 top-2 md:block"
          ></i>
          <i
            class="fas fa-microphone cursor-pointer fill-current text-gray-600 p-2 text-xl absolute right-3 top-2 md:block"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //objects and arrays
      contacts: null,
      menusmain: [
        "New group",
        "Create a room",
        "Profile",
        "Archived",
        "Starred",
        "Settings",
        "Log out",
      ],
      menuconvo: [
        "Contactinfo",
        "Select messages",
        "Mute notifications",
        "Clear messages",
        "Delete chat",
      ],
      contactSelected: null,

      //boolean
      menuToggledmain: false,
      menuToggledconvo: false,
      showconvo: false,

      //string
      search: "",
    };
  },

  mounted() {
    fetch("./contacts.json")
      .then((response) => response.json())
      .then((data) => (this.contacts = data));
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

  methods: {
    fetchSelectedPerson: function (person) {
      this.showconvo = true;
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
#menumain,
#menuconvo {
  animation: zoom 0.2s ease 0s;
}
</style>
