<template>
  <div class="container relative my-8 mx-auto border-8 border-black dark:border-red-600">
    <div
      class="h-screen bg-cover bg-no-repeat bg-bottom bg-[url('../../public/images/ISEP_PortoAP9I0151-v3.jpg')]"
    >
      <div class="sticky top-0 float-right bg-white/50 h-full w-2/6 py-20 px-16">
        <form action="" class="flex flex-col">
          <label for="name" class="flex-none text-black mt-6">Name</label>
          <input
            type="text"
            id="signInput"
            name="name"
            class="flex-none rounded p-1"
            placeholder="Enter your name"
          />

          <label for="email" class="flex-start text-black mt-6">Email</label>
          <input
            type="text"
            id="signInput"
            name="email"
            class="flex-none rounded p-1"
            placeholder="Enter your email"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
