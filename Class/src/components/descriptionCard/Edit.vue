<template>
  <CardLayout
    title="B 讲解卡"
    subTitle="这张活动卡要通过举例或演示来讲解一个新的知识点"
    color="#e56b16"
  >
    <div class="content-wrapper">
      <div class="form-item">
        <h5 class="form-item__title large required">
          我要讲解的新知识点是什么？
        </h5>
        <AntAutoComplete
          class="custom-auto-complete"
          v-model="formData.knowledge"
          optionLabelProp="label"
          :disabled="isQuoted"
          @search="fussySearch"
          @select="handleKnowledgeSelect"
        >
          <template slot="dataSource">
            <AntSelectOption
              v-if="knowledgeStatus === 'resolved'"
              class="custom-select-option"
              v-for="option of knowledgeOption"
              :key="option.value"
            >
              <span class="option-container">
                <AntTooltip :title="getFuzzySearchTitleToolip(option.label)">
                  <span class="label">{{ option.label }}</span>
                </AntTooltip>
                <span class="person">[{{ option.person }}]</span>
                <span class="used">[引用{{ option.used }}]</span>
              </span>
            </AntSelectOption>
            <AntSelectOption
              class="check-more"
              v-if="
                knowledgeStatus === 'resolved' && knowledgeOption.length > 0
              "
              key="check_more"
            >
              <span @click="handleClickCheckMore">查看更多>></span>
            </AntSelectOption>
          </template>
        </AntAutoComplete>
      </div>
      <div class="form-item half-width">
        <h5 class="form-item__title required">我要怎样来讲解新知？</h5>
        <AntSelect
          class="custom-select"
          :options="descriptionMethodOption"
          v-model="formData.how"
        />
      </div>
      <div class="form-item half-width">
        <h5 class="form-item__title required">我计划用多久完成？</h5>
        <AntSelect
          class="custom-select"
          :options="timeCostOption"
          v-model="formData.timeCost"
        />
      </div>
      <div class="form-item">
        <h5 class="form-item__title required">
          我要什么案例或演示方法为讲解？
        </h5>
        <h6 class="form-item__subtitle" style="color: red;">
          注: 要说明这种方法如何应用新知识点
        </h6>
        <AntTextArea
          class="custom-textarea"
          :rows="4"
          :autoSize="{minRows: 3, maxRows: 3}"
          v-model="formData.description"
        />
      </div>
      <div class="form-item half-width">
        <h5 class="form-item__title">我需要的媒体材料是什么？</h5>
        <h6 class="form-item__subtitle">
          如: 什么图片、什么音/视频、什么编译器等
        </h6>
        <div class="upload-area">
          <label class="upload-button">
            <AntIcon type="plus" />
            <span>我要上传</span>
            <input
              ref="fileInputRef"
              type="file"
              multiple
              accept="*"
              @change="handleFileInputChange"
            />
          </label>
          <div class="files-preview" ref="filesPreviewRef">
            <AntTooltip
              :title="file.fileName"
              placement="right"
              v-for="file of formData.attachment"
              :key="file.id"
            >
              <div class="file">
                <AntIcon
                  class="file__icon"
                  type="loading"
                  v-if="file.status === 'loading'"
                />
                <AntIcon
                  class="file__icon"
                  type="warning"
                  v-else-if="file.status === 'rejected'"
                />
                <AntIcon
                  class="file__icon"
                  type="file"
                  v-else-if="file.status === 'resolved'"
                />
                <span class="file__name">{{ file.fileName }}</span>
                <svg
                  class="file__button"
                  :style="{fontSize: '20px', marginRight: '6px'}"
                  @click="handleDeleteAttachment(file.id)"
                  t="1607650008394"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2168"
                  width="200"
                  height="200"
                >
                  <path
                    d="M285.76303955 775.94312052c0 41.47677609 33.93554407 75.41232014 75.41232014 75.41232015h301.64928062c41.47677609 0 75.41232014-33.93554407 75.41232014-75.41232015V323.46919964H285.76303955v452.47392088z m490.18008097-565.59240113h-131.97156025l-37.70616008-37.70616006h-188.53080038l-37.70616008 37.70616006H248.05687948v75.41232016h527.88624104v-75.41232016z"
                    p-id="2169"
                  ></path>
                </svg>
                <svg
                  v-if="file.status === 'resolved'"
                  class="file__button"
                  :style="{width: '16px', height: '16px'}"
                  @click="handleDownloadAttachment(file.id)"
                  t="1607650326208"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2293"
                  width="200"
                  height="200"
                >
                  <path
                    d="M192.639798 1023.9968h638.718004A63.9998 63.9998 0 0 0 895.9976 959.997c0-35.07189-29.183909-63.9998-64.639798-63.9998H192.639798a63.9998 63.9998 0 1 0 0 127.9996z m269.759157-280.447124c27.327915 32.639898 71.871775 32.639898 100.095687 0l248.959222-295.103077c16.255949-19.391939 23.103928-45.823857 19.711939-71.359777a53.119834 53.119834 0 0 0-52.223837-46.719854H619.774463V54.591829A53.567833 53.567833 0 0 0 566.782629 0H459.838963a53.567833 53.567833 0 0 0-53.119834 54.591829v275.775139H245.119634a53.119834 53.119834 0 0 0-52.223837 46.719854c-3.391989 25.53592 3.455989 51.967838 19.711939 71.359777l249.855219 295.103077z"
                    p-id="2294"
                  ></path>
                </svg>
              </div>
            </AntTooltip>
          </div>
        </div>
      </div>
      <div class="form-item half-width">
        <h5 class="form-item__title">我该如何通俗地表达难懂的学术名词？</h5>
        <AntTextArea
          class="custom-textarea"
          :rows="4"
          :autoSize="{minRows: 8, maxRows: 8}"
          v-model="formData.termExplanation"
        />
      </div>
      <div class="button-container">
        <AntButton @click="handleClickCanel" size="large">
          取消
        </AntButton>
        <AntButton
          v-if="associateCardId && !isQuoted"
          @click="handleAssociateGroup"
          type="primary"
          :disabled="associateGroupState === 'pending'"
          size="large"
        >
          应用关联画布
        </AntButton>
        <AntButton
          v-if="!associateCardId"
          @click="handleClickSave"
          type="danger"
          :disabled="apiStatus === 'pending'"
          :loading="apiStatus === 'pending'"
          size="large"
        >
          {{ isUpdate ? '更新' : '创建' }}
        </AntButton>
      </div>
    </div>
    <AntModal
      :visible="showCheckMoreModal"
      :closable="false"
      :bodyStyle="{padding: 0}"
      :destroyOnClose="true"
      dialogClass="description-custom-dialog"
      wrapClassName="description-wrapper"
      :footer="null"
      :width="720"
    >
      <CheckMoreForm
        :searchString="formData.knowledge"
        @cancel="handleCloseCheckMoreModal"
        @confirm="handleConfirm"
      />
    </AntModal>
  </CardLayout>
</template>

<script>
  import Card from '../Card';
  import {
    Button,
    Select,
    Input,
    Icon,
    message,
    Spin,
    AutoComplete,
    Modal,
    Tooltip,
  } from 'ant-design-vue';
  import {createNamespacedHelpers} from 'vuex';
  import {cloneDeep, debounce} from 'lodash-es';
  import warning from 'warning';
  import client from '@/configs/request';

  import CheckMoreForm from './edit/CheckMoreForm';

  const baseURL = process.env.VUE_APP_BASE_API;
  const easyId = () =>
    Math.random()
      .toString(36)
      .slice(2);
  const {mapState: canvasMapState} = createNamespacedHelpers('canvas');
  export default {
    name: 'Edit',
    components: {
      CardLayout: Card,
      AntButton: Button,
      AntSelect: Select,
      AntIcon: Icon,
      AntTextArea: Input.TextArea,
      AntSpin: Spin,
      AntSelectOption: Select.Option,
      AntAutoComplete: AutoComplete,
      AntModal: Modal,
      AntTooltip: Tooltip,
      CheckMoreForm,
    },
    props: {
      isQuoted: Boolean,
      groupId: Number,
      originFormData: Object,
      suggestedIndex: Number,
    },
    data() {
      return {
        formData: {
          knowledge: '',
          how: '',
          timeCost: '',
          description: '',
          termExplanation: '',
          attachment: [],
        },
        knowledgeStatus: 'idle',
        knowledgeOption: [],
        apiStatus: 'idle', // 'idle', 'pending', 'resolved', 'rejected'
        showCheckMoreModal: false,
        associateState: 'idle',
        associateGroupState: 'idle',
        associateCardId: '',
        isDestroyed: false,
      };
    },
    computed: {
      ...canvasMapState(['descriptionMethod', 'descriptionTimeCost']),
      isUpdate() {
        return Boolean(this.formData.id);
      },
      descriptionMethodOption() {
        if (this.descriptionMethod.status === 'pending') {
          return [{label: '数据加载中...', value: 'pending', disabled: true}];
        } else if (this.descriptionMethod.status === 'rejected') {
          return [{label: '数据加载失败', value: 'rejected', disabled: true}];
        } else if (this.descriptionMethod.status === 'resolved') {
          return this.descriptionMethod.data;
        } else {
          return [];
        }
      },
      timeCostOption() {
        if (this.descriptionTimeCost.status === 'pending') {
          return [{label: '数据加载中...', value: 'pending', disabled: true}];
        } else if (this.descriptionTimeCost.status === 'rejected') {
          return [{label: '数据加载失败', value: 'rejected', disabled: true}];
        } else if (this.descriptionTimeCost.status === 'resolved') {
          return this.descriptionTimeCost.data;
        } else {
          return [];
        }
      },
    },
    created() {
      if (this.originFormData) {
        this.formData.id = this.originFormData.id;
        this.formData.knowledge = this.originFormData.knowledge;
        this.formData.how = this.originFormData.how;
        this.formData.timeCost = this.originFormData.timeCost;
        this.formData.description = this.originFormData.description;
        this.formData.termExplanation = this.originFormData.termExplanation;
        this.formData.attachment =
          cloneDeep(this.originFormData.attachment) ?? [];
      }
      this.fussySearch = debounce(
        async function(searchString) {
          try {
            if (!searchString) {
              this.knowledgeOption = [];
              return;
            }
            this.knowledgeStatus = 'pending';
            const response = await client.post('/loadSelect/loadKnowledge', {
              knowledgePoint: searchString,
              pageSize: 5,
              pageNum: 1,
            });
            if (response.status === 200 && response.data.code === 0) {
              this.knowledgeStatus = 'resolved';
              this.knowledgeOption =
                response.data.data?.pageInfo?.map((item) => ({
                  value: String(item.id),
                  label: item.knowledgePoint,
                  person: item.createUserName,
                  used: item.count,
                })) ?? [];
            } else {
              this.knowledgeStatus = 'rejected';
            }
          } catch (error) {
            this.knowledgeStatus = 'rejected';
            warning(false, `<Edit>:(fussySearch):catched error: ${error}`);
          }
        }.bind(this),
        800
      );
    },
    beforeDestroy() {
      this.isDestroyed = true;
    },
    methods: {
      getFuzzySearchTitleToolip(title) {
        if (title <= 40) {
          return title;
        } else {
          return undefined;
        }
      },
      async handleAssociateGroup() {
        try {
          await this.formDataCheck();
        } catch (error) {
          return;
        }
        if (this.associateGroupState === 'pending') return;
        this.associateGroupState = 'pending';
        const hide = message.loading('关联画布...', 0);
        try {
          const transformLocalNameToServerRequired = (formData) => ({
            knowledgePoint: formData.knowledge,
            demonstrationTypeid: formData.how,
            demonstrationType: this.descriptionMethod.data.find(
              (method) => method.value === formData.how
            ).label,
            dictionaryExcepttimeId: formData.timeCost,
            displayCase: formData.description,
            popularDescription: formData.termExplanation,
            ids: formData.attachment
              .filter((file) => file.status === 'resolved')
              .map((file) => file.id)
              .join(','),
            groupId: this.groupId,
            quoteCardId: this.associateCardId,
          });
          const body = transformLocalNameToServerRequired(this.formData);
          if (this.formData.id) {
            body.id = this.formData.id;
          }
          let response;
          try {
            response = await client.post('/canvasCard/quoteCard', body);
          } catch {
            throw {globalHandled: true};
          }
          if (response.status === 200 && response.data.code === 0) {
            this.associateGroupState = 'resolved';
            hide();
            this.$emit('associate', response.data.data);
          } else {
            hide();
            message.warn(`胶囊关联失败，${response.data.mesg}`);
            this.associateGroupState = 'rejected';
            warning(
              false,
              `<Edit>:(handleAssociateGroup): update or create failed`
            );
          }
        } catch (error) {
          hide();
          this.associateGroupState = 'rejected';
          warning(
            false,
            `<Edit>:(handleAssociateGroup):catched Error ${error}`
          );
          if (error.globalHandled !== true) {
            message.warn('胶囊关联失败');
          }
        }
      },
      async handleConfirm(associateId) {
        try {
          await this.handleAssociate(Number(associateId));
          this.showCheckMoreModal = false;
        } catch (error) {
          warning(false, `<Edit>:(handleConfirm): associate failed`);
        }
      },
      async handleAssociate(associateId) {
        if (this.associateState === 'pending') {
          return;
        }
        this.associateState = 'pending';
        const hide = message.loading('获取讲解卡...', 0);
        try {
          let response;
          try {
            response = await client.post(
              '/canvasCard/getDemonstrationCardInfo',
              {id: associateId}
            );
          } catch {
            throw {globalHandled: true};
          }
          if (response.status === 200 && response.data.code === 0) {
            this.associateState = 'resolved';
            const originData = response.data.data;
            this.formData.knowledge = originData.knowledgePoint;
            this.formData.how = originData.demonstrationTypeid;
            this.formData.timeCost = originData.dictionaryExcepttimeId;
            this.formData.description = originData.displayCase;
            this.formData.termExplanation = originData.popularDescription;
            this.formData.attachment =
              originData?.files?.map((file) => ({
                id: file.id,
                status: 'resolved',
                fileName: file.fileName,
                url: file.url,
              })) ?? [];
            this.associateCardId = associateId;
            hide();
          } else {
            this.associateState = 'rejected';
            hide();
            message.warn(`讲解卡数据获取失败，${response.data.mesg}`);
            return Promise.reject();
          }
        } catch (error) {
          this.associateState = 'rejected';
          warning(
            false,
            `<CheckMoreForm>:(handleAssociate):catched error ${error}`
          );
          hide();
          if (error.globalHandled !== true) {
            message.warn(`讲解卡数据获取失败`);
          }
          return Promise.reject(error);
        }
      },
      handleCloseCheckMoreModal() {
        this.showCheckMoreModal = false;
      },
      handleClickCheckMore(event) {
        event.stopPropagation();
        this.showCheckMoreModal = true;
      },
      async handleKnowledgeSelect(value) {
        if (value === 'check_more') {
          return;
        }
        try {
          await this.handleAssociate(Number(value));
        } catch (error) {
          warning(false, `<Edit>:(handleKnowledgeSelect): associate failed`);
        }
      },
      async handleFileInputChange(event) {
        const isFileSizeLargerThanMB = (size, mb) => {
          return size > 1024 * 1024 * mb;
        };
        try {
          const files = [...event.target.files];
          const uploads = [];
          for (const file of files) {
            if (
              file.type.startsWith('image/') &&
              isFileSizeLargerThanMB(file.size, 2)
            ) {
              message.warn('图片的大小不能超过2M');
              continue;
            } else if (isFileSizeLargerThanMB(file.size, 200)) {
              message.warn('文件的大小不能超过200M');
              continue;
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append(
              'uploadType',
              file.type.startsWith('image/') ? '2' : '3'
            );
            const tempId = easyId();
            uploads.push({
              request: client.post('/uploadFile', formData, {timeout: 0}),
              id: tempId,
            });
            this.formData.attachment.push({
              id: tempId,
              status: 'loading',
              fileName: file.name,
              url: '',
            });
          }
          this.$nextTick(() => {
            this.$refs.filesPreviewRef.scrollTo({
              left: 0,
              top: this.$refs.filesPreviewRef.scrollHeight,
              behavior: 'smooth',
            });
          });
          for (const upload of uploads) {
            const matchedUpload = this.formData.attachment.find(
              (attachment) => attachment.id === upload.id
            );
            if (!matchedUpload) continue;
            try {
              const response = await upload.request;
              if (this.isDestroyed) return;
              if (response.status === 200 && response.data.code === 0) {
                message.success(`[${matchedUpload.fileName}]文件上传成功`);
                matchedUpload.status = 'resolved';
                matchedUpload.url = response.data.data.url;
                matchedUpload.id = response.data.data.id;
              } else {
                message.warn(
                  `[${matchedUpload.fileName}]文件上传失败，${response.data.mesg}`
                );
                matchedUpload.status = 'rejected';
                warning(
                  false,
                  `<Edit>:(handleFileInputChange):file upload failed`
                );
              }
            } catch (error) {
              message.warn(`[${matchedUpload.fileName}]文件上传失败`);
              matchedUpload.status = 'rejected';
              warning(
                false,
                `<Edit>:(handleFileInputChange):catched Error in for of loop: ${error}`
              );
            }
          }
        } catch (error) {
        } finally {
          this.clearFileInput();
        }
      },
      clearFileInput() {
        if (this.$refs.fileInputRef) {
          this.$refs.fileInputRef.value = '';
        }
      },
      async formDataCheck() {
        if (this.formData.knowledge === '') {
          message.warn('知识点内容不能为空');
          throw new Error('知识点内容不能为空');
        }
        if (this.formData.how === '') {
          message.warn('新知讲解方法不能为空');
          throw new Error('新知讲解方法不能为空');
        }
        if (this.formData.timeCost === '') {
          message.warn('计划完成时间不能为空');
          throw new Error('计划完成时间不能为空');
        }
        if (this.formData.description === '') {
          message.warn('案例或演示方法不能为空');
          throw new Error('案例或演示方法不能为空');
        }

        const hasPendingAttachment =
          this.formData.attachment.reduce(
            (acc, cur) => acc + (cur.status === 'loading' ? 1 : 0),
            0
          ) > 0;

        if (hasPendingAttachment) {
          message.warn('媒体材料正在上传中');
          throw new Error('媒体材料不能为空');
        }
      },
      async handleDownloadAttachment(id) {
        let hide;
        try {
          const attachment = this.formData.attachment.find(
            (attachment) => attachment.id === id
          );
          hide = message.loading('下载附件...', 0);
          let response;
          try {
            response = await client.get(attachment.url, {
              responseType: 'blob',
              timeout: 0,
            });
          } catch {
            throw {globalHandled: true};
          }
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', attachment.fileName);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          hide?.();
        } catch (error) {
          hide?.();
          if (error.globalHandled !== true) {
            message.warn('附件下载失败');
          }
        }
      },
      async handleClickSave() {
        try {
          await this.formDataCheck();
        } catch (error) {
          return;
        }

        if (this.apiStatus === 'pending') return;
        this.apiStatus = 'pending';
        const hide = message.loading(
          `${this.isUpdate ? '更新' : '创建'}讲解卡...`,
          0
        );
        try {
          const transformLocalNameToServerRequired = (formData) => ({
            knowledgePoint: formData.knowledge,
            demonstrationTypeid: formData.how,
            demonstrationType: this.descriptionMethod.data.find(
              (method) => method.value === formData.how
            ).label,
            dictionaryExcepttimeId: formData.timeCost,
            displayCase: formData.description,
            popularDescription: formData.termExplanation,
            ids: formData.attachment
              .filter((file) => file.status === 'resolved')
              .map((file) => file.id)
              .join(','),
            orderNum: this.suggestedIndex,
            groupId: this.groupId,
          });
          const apiEndPoint = this.isUpdate
            ? '/updateCard/update'
            : '/canvasCard/createDemonstrationCard';
          const body = transformLocalNameToServerRequired(this.formData);
          if (this.isUpdate) {
            body.id = this.formData.id;
            body.cardType = 2;
          }
          let response;
          try {
            response = await client.post(apiEndPoint, body);
          } catch {
            throw {globalHandled: true};
          }
          if (response.status === 200 && response.data.code === 0) {
            this.apiStatus = 'resolved';
            if (this.isUpdate) {
              this.$emit('update', {
                id: this.formData.id,
                formData: {
                  ...this.formData,
                  attachment: this.formData.attachment.filter(
                    (attachment) => attachment.status === 'resolved'
                  ),
                },
                type: 'description',
                isQuoted: this.isQuoted,
                timeCost: Number.parseFloat(
                  this.descriptionTimeCost.data.find(
                    (timeCost) => timeCost.value === this.formData.timeCost
                  ).average
                ),
              });
            } else {
              this.$emit('save', {
                id: response.data.data.id,
                formData: {
                  ...this.formData,
                  id: response.data.data.id,
                  attachment: this.formData.attachment.filter(
                    (attachment) => attachment.status === 'resolved'
                  ),
                },
                type: 'description',
                timeCost: Number.parseFloat(
                  this.descriptionTimeCost.data.find(
                    (timeCost) => timeCost.value === this.formData.timeCost
                  ).average
                ),
              });
            }
            hide();
          } else {
            hide();
            message.warn(
              `讲解卡${this.isUpdate ? '更新' : '创建'}失败，${
                response.data.mesg
              }`
            );
            this.apiStatus = 'rejected';
            warning(false, `<Edit>:(handleClickSave): update or create failed`);
          }
        } catch (error) {
          hide();
          this.apiStatus = 'rejected';
          warning(false, `<Edit>:(handleClickSave):catched Error ${error}`);
          if (error.globalHandled !== true) {
            message.warn(`讲解卡${this.isUpdate ? '更新' : '创建'}失败`);
          }
        }
      },
      handleClickCanel() {
        this.$emit('cancel');
      },
      handleDeleteAttachment(fileId) {
        this.formData.attachment = this.formData.attachment.filter(
          (file) => file.id !== fileId
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content-wrapper {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .form-item {
      width: 100%;

      &.half-width {
        width: 48%;
      }
      &__title {
        font-size: 17px;
        color: #e56b16;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
      }
      &__title.large {
        font-size: 20px;
        font-weight: bold;
      }
      &__title.required::before {
        content: '*';
        display: block;
        color: red;
      }
      &__subtitle {
        font-size: 11px;
        color: #e56b16;
        text-align: center;
      }
      .custom-auto-complete {
        width: 100%;
        overflow: hidden;
      }
      .custom-select {
        width: 100%;
      }
      .custom-text-area {
        width: 100%;
      }
      .upload-area {
        height: 181px;
        padding-top: 4px;

        .upload-button {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          border: dashed 1px #b9b9b9;
          border-radius: 6px;
          height: 47px;
          color: #666;
          font-size: 14px;
          transition: background-color linear 0.2s, border linear 0.2s;

          &:hover {
            background-color: #eee;
            border-style: solid;
          }

          span {
            color: inherit;
            margin-left: 7px;
          }

          cursor: pointer;
          input[type='file'] {
            // Note: opacity is used to hide the file input instead of visibility: hidden or display: none,
            // because assistive technology interprets the latter two styles to mean the file input isn't interactive.
            opacity: 0;
            display: block;
            width: 0px;
            height: 0px;
          }
        }

        .files-preview {
          height: calc(100% - 47px);
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;

          .file {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            padding: 11px;
            transition: background-color linear 0.3s;

            &__icon {
              width: 20px;
              height: 20px;
              font-size: 20px;
              color: #888;
              margin-right: 8px;
            }

            &__name {
              flex: 1;
              font-size: 14px;
              line-height: 1.3;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #666666;
            }

            &__button {
              font-size: 20px;
              cursor: pointer;
              display: none;
              fill: #666;

              &:hover {
                fill: #017b83;
              }
            }

            &:hover {
              background-color: #ecf2f3;
              .file__button {
                display: block;
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
    .button-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      & > * {
        margin-left: 8px;
      }

      .ant-btn {
        background-color: #e5e5e5;
        border-color: #e5e5e5;
        color: #666;

        &:hover {
          background-color: #d7d7d7;
          border-color: #d7d7d7;
        }
      }

      .ant-btn.ant-btn-primary {
        background-color: #e56b16;
        border-color: #e56b16;
        color: #fff;

        &:hover {
          background-color: #dc630c;
          border-color: #dc630c;
        }
      }
      .ant-btn.ant-btn-danger {
        background-color: #e56b16;
        border-color: #e56b16;
        color: #fff;

        &:hover {
          background-color: #dc630c;
          border-color: #dc630c;
        }
      }
    }
  }
</style>

<style lang="scss">
  .custom-select-option {
    .option-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      .label {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .person,
      .used {
        flex-shrink: 0;
      }
    }
  }
  .check-more {
    span {
      color: #017b83;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .description-wrapper {
    z-index: 1060;
  }
</style>
