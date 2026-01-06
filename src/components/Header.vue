<template>
  <header>
    <!-- Phần banner -->
    <div class="vks-header">
      <img src="../assets/header-bg.jpg" alt="Banner" class="banner-bg" />

      <div class="header-content">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
        <h2 class="vks-title">
          VIỆN KIỂM SÁT NHÂN DÂN THÀNH PHỐ CẦN THƠ
        </h2>
      </div>
    </div>

    <!-- Thanh phía dưới -->
    <div class="header-nav">
      <h5>TRANG PHẢN ÁNH</h5>
    </div>
  </header>
</template>

<script setup>
// Không cần script
</script>

<style scoped>
/* Khối banner */
.vks-header {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

/* Ảnh nền */
.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Logo + Tiêu đề */
.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 80px;
}

/* Logo */
.logo {
  height: 110px;
  width: auto;
  margin-right: 25px;
}

/* Tiêu đề chính */
.vks-title {
  font-weight: 700;
  font-size: 48px;
  color: #e94040;
}

/* Thanh xanh dưới banner */
.header-nav {
  position: relative;
  z-index: 10; /* tăng z-index để nằm trên banner */
  width: 100%;
  background-color: #083358;
  text-align: center;
  padding: 8px 0;
}

/* Chữ trong thanh nav */
.header-nav h5 {
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  font-size: 16px;
}
</style>
