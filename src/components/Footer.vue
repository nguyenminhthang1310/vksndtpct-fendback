<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- LOGO + Giới thiệu -->
      <div class="footer-col logo-col">
        <img
          src="../assets/logo.png"
          alt="Logo Viện kiểm sát"
          class="footer-logo"
        />
        <p>
          Ứng dụng công nghệ thông tin trong quản lý, điều hành và cải cách tư pháp.
        </p>
      </div>

      <!-- Liên kết nhanh -->
      <div class="footer-col">
        <h4>Liên kết nhanh</h4>
        <ul>
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Giới thiệu</a></li>
        </ul>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="footer-col">
        <h4>Liên hệ</h4>
        <p>📍Số 19, Phường An Bình, TP Cần Thơ, Việt Nam</p>
        <p>
          📧
          <a href="mailto:totungcongich_cantho@vks.gov.vn">
            totungcongich_cantho@vks.gov.vn
          </a>
        </p>
        <p>☎ 0292.xxx.xxxx</p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} Viện kiểm sát nhân dân TP. Cần Thơ.  
      Phát triển bởi Bộ phận CNTT.
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, #0f4c81, #083358);
  color: #ffffff;
  padding: 40px 20px 0;
  font-family: Arial, Helvetica, sans-serif;
}

.footer-container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}

.footer-col h3,
.footer-col h4 {
  margin: 10px 0;
  color: #ffd966;
}

.footer-col p,
.footer-col a {
  font-size: 14px;
  line-height: 1.6;
  color: #ffffff;
}

.footer-col a {
  text-decoration: none;
}

.footer-col a:hover {
  color: #ffd966;
  text-decoration: underline;
}

/* LOGO */
.logo-col {
  text-align: left;
}

.footer-logo {
  width: 90px;
  height: auto;
  margin-bottom: 10px;
}

/* List */
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col ul li {
  margin-bottom: 8px;
}

/* Bottom */
.footer-bottom {
  margin-top: 30px;
  padding: 15px 10px;
  background-color: rgba(0, 0, 0, 0.25);
  text-align: center;
  font-size: 13px;
}
</style>
