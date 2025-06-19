<template>
    <header class="header">
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
            <div class="container">
                <a
                    class="navbar-brand"
                    href="#"
                >
                    <img
                        src="../public/logo/mulda_logo.png"
                        alt="Logo"
                        class="w-100 d-inline-block align-text-top"
                        style="max-width: 100px;"
                    />
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                            >
                                Link
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                    >
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                    >
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                    >
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <RouterView />
    </main>

    <footer class="footer text-center text-md-start text-white">
        <FooterInfo />
    </footer>
</template>

<script setup lang="ts">
import FooterInfo from './components/FooterInfo.vue'
import { onMounted } from 'vue'
import { users } from './services/api/services'
import { RouterView } from 'vue-router'

onMounted(async () => {
    console.log(await users.getAll())
})

</script>
