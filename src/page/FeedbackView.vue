<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Nội dung chính -->
    <div class="container py-5">
      <h2 class="text-center text-primary fw-bold mb-4">💬 Gửi câu hỏi của bạn</h2>

      <!-- Form hỏi đáp -->
      <div class="card shadow-sm mb-5">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">Họ và tên</label>
              <input v-model="form.username" type="text" class="form-control" placeholder="Nhập họ tên (tuỳ chọn)" />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">Số điện thoại</label>
              <input v-model="form.phone" type="text" class="form-control" placeholder="Nhập số điện thoại (tuỳ chọn)" />
            </div>
          </div>

          <div class="mt-3">
            <label class="form-label fw-semibold">Nội dung câu hỏi *</label>
            <textarea
              v-model="form.message"
              class="form-control"
              rows="4"
              placeholder="Nhập nội dung câu hỏi..."
            ></textarea>
          </div>

          <div class="text-end mt-3">
            <button class="btn btn-primary fw-semibold px-4" @click="sendFeedback">📤 Gửi câu hỏi</button>
          </div>
        </div>
      </div>

      <!-- Bộ lọc tìm kiếm -->
      <div class="card border-0 shadow-sm mb-4 p-3">
        <h5 class="fw-bold mb-3 text-secondary">🔍 Tìm kiếm câu hỏi</h5>
        <div class="row g-3 align-items-end">
          <div class="col-md-3">
            <label class="form-label">Họ tên</label>
            <input v-model="filters.name" class="form-control" placeholder="Nhập họ tên" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Số điện thoại</label>
            <input v-model="filters.phone" class="form-control" placeholder="Nhập số điện thoại" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Từ ngày</label>
            <input v-model="filters.fromDate" type="date" class="form-control" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Đến ngày</label>
            <input v-model="filters.toDate" type="date" class="form-control" />
          </div>
        </div>

        <div class="text-end mt-3">
          <button class="btn btn-success me-2" @click="applyFilters">Lọc</button>
          <button class="btn btn-outline-secondary" @click="resetFilters">Đặt lại</button>
        </div>
      </div>

      <!-- Danh sách hỏi đáp -->
      <div v-if="showResults" class="feedback-list">
        <h4 class="text-success text-center fw-bold mb-3">📋 10 câu hỏi gần đây</h4>

        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else>
          <div v-if="filteredFeedbacks.length === 0" class="text-center text-muted py-4">
            Không có câu hỏi phù hợp.
          </div>

          <div
            v-for="fb in filteredFeedbacks"
            :key="fb._id"
            class="card shadow-sm mb-3 border-0"
          >
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>{{ fb.username || 'Người hỏi' }}</strong>
                <small class="text-muted">{{ formatDate(fb.createdAt) }}</small>
              </div>
              <p class="mb-2">{{ fb.message }}</p>

              <div v-if="fb.answer" class="p-3 bg-light border-start border-success">
                💡 <strong>Trả lời:</strong> {{ fb.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../api/axiosClient";
import dayjs from "dayjs";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
// Biến dữ liệu
const form = ref({ username: "", phone: "", message: "" });
const feedbacks = ref([]);
const filters = ref({ name: "", phone: "", fromDate: "", toDate: "" });
const showResults = ref(true);
const loading = ref(false);

// Gửi câu hỏi
const sendFeedback = async () => {
  console.log("BASE URL =", api.defaults.baseURL);
  if (!form.value.message.trim()) return alert("⚠️ Vui lòng nhập nội dung câu hỏi!");
  try {
    await api.post("/feedbacks", form.value);
    alert("✅ Gửi câu hỏi thành công!");
    form.value = { username: "", phone: "", message: "" };
    fetchFeedbacks();
  } catch (err) {
    console.error(err);
    alert("❌ Lỗi gửi câu hỏi");
  }
};

// Lấy 10 câu hỏi mới nhất
const fetchFeedbacks = async () => {
  try {
    const res = await api.get("/feedbacks");
    feedbacks.value = res.data
      .filter(fb => fb.visible)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

  } catch (err) {
    console.error(err);
  }
};

// Định dạng ngày
const formatDate = date => dayjs(date).format("DD/MM/YYYY HH:mm");

// Bộ lọc
const filteredFeedbacks = computed(() => {
  return feedbacks.value.filter(fb => {
    const matchName = filters.value.name
      ? fb.username?.toLowerCase().includes(filters.value.name.toLowerCase())
      : true;
    const matchPhone = filters.value.phone
      ? fb.phone?.includes(filters.value.phone)
      : true;
    const fbDate = dayjs(fb.createdAt);
    const from = filters.value.fromDate ? dayjs(filters.value.fromDate) : null;
    const to = filters.value.toDate ? dayjs(filters.value.toDate) : null;
    const matchDate =
      (!from || fbDate.isAfter(from.startOf("day"))) &&
      (!to || fbDate.isBefore(to.endOf("day")));
    return matchName && matchPhone && matchDate;
  });
});

// Áp dụng và reset bộ lọc
const applyFilters = async () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 600);
};
const resetFilters = () => {
  filters.value = { name: "", phone: "", fromDate: "", toDate: "" };
  fetchFeedbacks();
};

// Khi tải trang
onMounted(fetchFeedbacks);
</script>

<style scoped>
.feedback-list {
  max-height: 600px;
  overflow-y: auto;
}
.feedback-list::-webkit-scrollbar {
  width: 6px;
}
.feedback-list::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
  