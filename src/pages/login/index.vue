<template>
  <div class="page">
    <comment-header :title="'登录'" :back="backUrl"></comment-header>
    <div class="content" ref="content">
      <div class="login-container">
        <div class="login-content">
          <div class="login-input border-bottom">
            <span>账号</span>
            <input
              type="text"
              v-model.trim="username"
              placeholder="请输入账号"
            />
          </div>
          <div class="login-input">
            <span>登录密码</span>
            <input
              type="password"
              v-model.trim="password"
              placeholder="请输入登录密码"
            />
          </div>
        </div>
        <div class="login-btn">
          <div class="submit" @click="login">登录</div>
        </div>
        <div class="login-desc">
          <router-link
            :to="`/register?url=${encodeURIComponent(loginRedirect)}`"
            >免费注册</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginValidator from "@/validate/login";
import { validate } from "@/utils/function";
import CommentHeader from "@/components/Header";
import { Token } from "@/utils/token";

export default {
  components: {
    CommentHeader
  },
  data() {
    return {
      backUrl: "",
      username: "",
      password: "",
      loginRedirect: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    const token = Token.getToken();
    if (token !== "") {
      next(from.path);
    } else {
      next(vm => {
        vm.backUrl = from.path;
      });
    }
  },
  mounted() {
    let bodyHeight = document.documentElement.offsetHeight;
    this.$refs.content.style.height = bodyHeight + "px";
    this.loginRedirect = decodeURIComponent(this.$route.query.url) || "/";
    this.backUrl = this.loginRedirect;
  },
  methods: {
    login() {
      const data = {
        username: this.username,
        password: this.password
      };
      const res = validate(data, loginValidator);
      if (res.error !== 0) {
        this.$showToast({
          message: res.message
        });
        return;
      }
      this.axios
        .post("shose/user/login", data)
        .then(res => {
          const { token } = res;
          Token.setToken(token);
          //跳转页面
          this.$router.push(this.loginRedirect);
        })
        .catch(err => {
          this.$showToast({
            message: err.message
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";

.page {
  width: 100%;
  height: 100%;
  margin-top: $header-h;

  .content {
    background: #f5f5f5;
    width: 100%;

    .login-container {
      width: 100%;
      padding: 0.4rem 0;

      .login-content {
        width: 100%;
        background: $color-white;

        .login-input {
          width: 100%;
          height: 1rem;
          display: flex;

          span {
            width: 1.5rem;
            height: 100%;
            line-height: 1rem;
            text-indent: 0.2rem;
          }

          input {
            flex: 1;
            height: 100%;
          }
        }
      }
    }

    .login-btn {
      width: 100%;
      height: 1rem;
      margin-top: 0.4rem;
      padding: 0 0.2rem;
      box-sizing: border-box;

      .submit {
        width: 100%;
        height: 100%;
        background: $color-global;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.1rem;
        line-height: 1rem;
        text-align: center;
        letter-spacing: 0.1rem;
      }
    }

    .login-desc {
      line-height: 1rem;
      text-align: right;
      font-size: 0.28rem;
      color: $color-global;
      padding-right: 0.2rem;
    }
  }
}
</style>
