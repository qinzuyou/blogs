<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import { ref, reactive } from "vue"
import { useGlobalStore } from "@/stores/index"
import { allType, typeWallpaper, uploadWallpaper } from "@/utils/wallpaper"
import ImgModel from "@/components/imgModel/index.vue"
import Qzbutton from '@/components/qz/button/index.vue'
import { ElMessage } from 'element-plus'


const store = useGlobalStore()

const wallpaper = reactive({
  title: '',
  uid: store.user.uid,
  file: '',
})

const typevalue = ref('')
const typeId=ref('')

const options: any = ref({})

allType().then((res: any) => {
  console.log(res);
  res = res.map((item: any) => {
    return {
      id:item.wid,
      value: item.name,
      label: item.name
    }
  })
  typevalue.value = res[0].value
  typeId.value=res[0].id
  options.value = res
  
})

let imgModel = ref(false)

function imgModelShow() {

  imgModel.value = !imgModel.value
  console.log(imgModel.value);

}

//壁纸上传
let coverImg = ref()
//图片上传
function upCover(e: any) {
  let file = e.target.files[0];

  console.log(file);

  // console.log(file);
  coverImg.value = URL.createObjectURL(file)
  wallpaper.file = file

}


let coverCut = ref(false)


function coverCuts() {
  coverCut.value = !coverCut.value
}


//删除图片
function deleteCover() {
  wallpaper.file = ""
  coverImg.value = ""
  // if(fileInput.value.value!="") fileInput = ""
}

function cutId(e:any){
    console.log(e);
    typeId.value=e
    
}

function upLoad(){
  console.log(wallpaper.title);
  
      let data = new FormData()

      data.append("name",wallpaper.title)
      data.append("files",wallpaper.file)
      data.append("uId",wallpaper.uid)
      data.append("type",typeId.value)

      console.log(data.getAll("files"));

      uploadWallpaper(data).then(res=>{
        console.log(res);
        ElMessage.success(`上传成功`)

        wallpaper.file=''
        coverImg.value=''
        wallpaper.title=''
        
      })

      
}

</script>
<template>
  <Transition>
    <ImgModel v-if="imgModel" :img="coverImg" @set-show="imgModelShow"></ImgModel>
  </Transition>
  <div class="uploadWallpaper ">
    <Huge :img="'/images/2.jpg'" :title="'壁纸上传'"></Huge>

    <div class="uoload-box shadow fade-in-bottom">
      <div class="wallpaper-title">

        <input type="text" placeholder="壁纸标题" v-model="wallpaper.title">
      </div>
      <div class="wallpaper-type">
        <p>壁纸类型</p>
        <el-select v-model="typevalue" class="m-2" placeholder="Select" size="large" style="width: 240px" >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="cutId(item.id)"/>
        </el-select>
      </div>
      <div class="wallpaper-upload">
        <p>壁纸上传</p>


        <transition mode="out-in">
          <div class="cover-s-box" @mouseenter="coverCuts" @mouseleave="coverCuts" v-if="coverImg">
            <transition>
              <ul v-if="coverCut">
                <li>
                  <svg-icon iconName="icon-search" @click="imgModelShow" color="#fff"></svg-icon>
                </li>
                <li @click="deleteCover">
                  <svg-icon iconName="icon-lajitong" color="#fff"></svg-icon>
                </li>

              </ul>
            </transition>
            <img :src="coverImg" alt="">
          </div>


          <label for="submit" v-else>
            <input type="file" id="submit" @change="upCover" accept="image/*">
            <svg-icon iconName="icon-wei-1" color="#ccc"></svg-icon>
          </label>
         
        </transition> 
        <Qzbutton :title="'上传'" @click="upLoad" iconName="icon-login" :icon="false" :width="'105'" :height="'34'" radius="4">
          </Qzbutton>
      </div>


    </div>
  </div>
</template>



<style scoped lang="scss">
.qz-button{
  margin-top: 10px;
}
.cover-s-box {
  img {
    width: 200px;
    height: 200px;
    transition: .3s;
  }
margin-top: 10px;
  overflow: hidden;
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #cdd0d6;
  border-radius: 4px;
  cursor: pointer;
 

  ul {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      padding: 20px;
    }
  }
}

.wallpaper-upload {
  display: flex;
  flex-direction: column;

  align-items: center;

  label {
    margin-top: 10px;
    width: 200px;
    height: 200px;
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    cursor: pointer;

    input {
      display: none;
    }
  }

  label:hover {
    border: 1px dashed var(--theme-color);

  }

  p {
    font-size: 20px;
    margin-top: 10px;
    color: var(--theme-color);

  }
}

.wallpaper-type {
  margin-top: 10px;
  display: flex;
  align-items: center;

  p {
    margin-right: 10px;
    font-size: 20px;
    color: var(--theme-color);
  }
}

.wallpaper-title {
  input {
    // outline: none;
    border: none;
    margin-top: 10px;
    font-size: 24px;
    padding: 10px 0;
  }

  border-bottom: 1px solid #ccc;
}

.shadow {
  background-color: #fff;
  border-radius: var(--radius-wrap);
  box-shadow: var(--box-shadow);
  width: 100%;
}

.uoload-box {
  width: 1150px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10px;
}
</style>