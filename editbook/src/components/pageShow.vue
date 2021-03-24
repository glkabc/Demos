<template>
  <div class="container">
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo"
      background-color="#fff"
      text-color="#888"
      mode="horizontal"
      active-text-color='#1890ff'
      @select="handleSelect">
      <el-menu-item index="1">动漫</el-menu-item>
      <el-menu-item index="2">风景</el-menu-item>
      <el-menu-item index="3">动物</el-menu-item>
      <el-menu-item index="4">游戏</el-menu-item>
      <el-menu-item index="5">美食</el-menu-item>
    </el-menu>
    <div class="image-list">
      <a-card hoverable style="width: 240px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          www.instagram.com
        </template>
      </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          www.instagram.com
        </template>
      </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          www.instagram.com
        </template>
      </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          www.instagram.com
        </template>
      </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          www.instagram.com
        </template>
      </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          www.instagram.com
        </template>
      </a-card-meta>
      </a-card>
      <el-upload
        :limit='1'
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="pagination">
      <a-pagination 
        :default-current="6" 
        :total="total"
        :hideOnSinglePage='true'
        v-model="current"
        @change='pageChange'
      />
    </div>
  </div>
</template>

<script>
export default {
  name:  'pageShow',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      current: 5,
      total: 20,
    }
  },
  components: {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    pageChange(page, pageSize) {
      console.log(page, pageSize)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: 100%;
  .el-menu-demo {
  }
  .pagination {
    /* position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%); */
    text-align: center;
    padding-bottom: 20px;
  }
  .image-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }
}
  
</style>