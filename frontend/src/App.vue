<template>
    <header class="header">
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../public/logo/mulda_logo.png" alt="Logo" class="w-100 d-inline-block align-text-top" style="max-width: 100px;">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section>
      <div id="intro" class="bg-image" style="
          background-image: linear-gradient(to left, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.73)), url('https://images.unsplash.com/photo-1633707167682-9068729bc84c');
          height: 65vh;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top center;
        ">
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.2);">
          <div class="container d-flex justify-content-start align-items-center text-white h-100">
            <div class="row align-items-center">
              <div class="col-12">
                <h1 class="text-white display-1 fw-bold">Soběšická Mulda 2025</h1>
                <p class="fs-3">
                    27. ročník tradičního závodu horských kol <br>pro veřejnost se uskuteční 12. října 2025
                </p>

                <button type="button" class="btn btn-outline-light mt-4 rounded-3">
                 Registrace
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </header>

    <div class="container">

    </div>

    <footer class="footer text-center text-md-start text-white mt-5">
        <FooterInfo />
    </footer>
</template>

<script setup lang="ts">
import FooterInfo from './components/FooterInfo.vue'
import { onMounted } from 'vue'
import { users } from './api/services'

onMounted(async () => {
    console.log(await users.getAll())
})
</script>

<style>
.mask {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
}

</style>
