/** @jsxImportSource @emotion/react */
import { render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import { roleFormDefaultValue } from '../role-form-wrapper';
import RoleForm from '../role-form';

test('match inline snapshot', async () => {
  const { container } = await render(
    <RoleForm initialValues={roleFormDefaultValue} />,
  );
  expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      width: 300px;
    }

    .emotion-1 {
      cursor: pointer;
    }

    .emotion-2 {
      cursor: pointer;
      -webkit-align-self: stretch;
      -ms-flex-item-align: stretch;
      align-self: stretch;
      -webkit-align-items: flex-start;
      -webkit-box-align: flex-start;
      -ms-flex-align: flex-start;
      align-items: flex-start;
    }

    .emotion-3 {
      margin: 8px 0px;
    }

    .emotion-4 {
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
    }

    <div>
      <form
        class="emotion-0"
        novalidate=""
      >
        <div
          class="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth"
        >
          <label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense Mui-focused Mui-focused"
            data-shrink="true"
            for="role_name"
            id="role_name-label"
          >
            角色名称
          </label>
          <div
            class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth Mui-focused Mui-focused MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedEnd MuiInputBase-marginDense MuiInput-marginDense"
          >
            <input
              aria-invalid="false"
              class="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd MuiInputBase-inputMarginDense MuiInput-inputMarginDense"
              id="role_name"
              name="role_name"
              type="text"
              value=""
            />
            <div
              class="MuiInputAdornment-root  emotion-1 MuiInputAdornment-positionEnd MuiInputAdornment-marginDense"
              title="角色名称最多二十个字"
            >
              <svg
                fill="currentColor"
                height="1em"
                stroke="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth"
        >
          <label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-marginDense"
            data-shrink="false"
          >
            角色描述
          </label>
          <div
            class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl MuiInputBase-multiline MuiInput-multiline MuiInputBase-adornedEnd MuiInputBase-marginDense MuiInput-marginDense"
          >
            <textarea
              aria-invalid="false"
              class="MuiInputBase-input MuiInput-input MuiInputBase-inputMultiline MuiInput-inputMultiline MuiInputBase-inputAdornedEnd MuiInputBase-inputMarginDense MuiInput-inputMarginDense"
              name="role_description"
              rows="4"
            />
            <div
              class="MuiInputAdornment-root  emotion-2 MuiInputAdornment-positionEnd MuiInputAdornment-marginDense"
              title="角色描述最多二百五十个字"
            >
              <svg
                fill="currentColor"
                height="1em"
                stroke="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </div>
          </div>
        </div>
        <fieldset
          class="MuiFormControl-root emotion-3"
        >
          <legend
            class="MuiFormLabel-root"
          >
            角色状态
          </legend>
          <div
            aria-label="gender"
            class="MuiFormGroup-root emotion-4"
            role="radiogroup"
          >
            <label
              class="MuiFormControlLabel-root"
            >
              <span
                aria-disabled="false"
                class="MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-1 MuiRadio-root MuiRadio-colorSecondary PrivateSwitchBase-checked-2 Mui-checked MuiIconButton-colorSecondary"
              >
                <span
                  class="MuiIconButton-label"
                >
                  <input
                    checked=""
                    class="PrivateSwitchBase-input-4"
                    name="role_status"
                    type="radio"
                    value="1"
                  />
                  <div
                    class="PrivateRadioButtonIcon-root-5 PrivateRadioButtonIcon-checked-7"
                  >
                    <svg
                      aria-hidden="true"
                      class="MuiSvgIcon-root"
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                      />
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="MuiSvgIcon-root PrivateRadioButtonIcon-layer-6"
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
                      />
                    </svg>
                  </div>
                </span>
                <span
                  class="MuiTouchRipple-root"
                />
              </span>
              <span
                class="MuiTypography-root MuiFormControlLabel-label MuiTypography-body1"
              >
                启用
              </span>
            </label>
            <label
              class="MuiFormControlLabel-root"
            >
              <span
                aria-disabled="false"
                class="MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-1 MuiRadio-root MuiRadio-colorSecondary MuiIconButton-colorSecondary"
              >
                <span
                  class="MuiIconButton-label"
                >
                  <input
                    class="PrivateSwitchBase-input-4"
                    name="role_status"
                    type="radio"
                    value="0"
                  />
                  <div
                    class="PrivateRadioButtonIcon-root-5"
                  >
                    <svg
                      aria-hidden="true"
                      class="MuiSvgIcon-root"
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                      />
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="MuiSvgIcon-root PrivateRadioButtonIcon-layer-6"
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
                      />
                    </svg>
                  </div>
                </span>
                <span
                  class="MuiTouchRipple-root"
                />
              </span>
              <span
                class="MuiTypography-root MuiFormControlLabel-label MuiTypography-body1"
              >
                禁用
              </span>
            </label>
          </div>
        </fieldset>
      </form>
      <footer
        class="ReactQueryDevtools"
      >
        <div
          class="ReactQueryDevtoolsPanel"
          style="font-family: sans-serif; display: flex; background-color: rgb(11, 21, 33); color: white; position: fixed; bottom: 0px; right: 0px; z-index: 99999; width: 100%; height: 500px; max-height: 90%; box-shadow: 0 0 20px rgba(0,0,0,.3); border-top: 1px solid #3f4e60; transform-origin: top; transition: all .2s ease; opacity: 0; pointer-events: none; transform: translateY(15px) scale(1.02);"
        >
          <style>
            
                .ReactQueryDevtoolsPanel * {
                  scrollbar-color: #132337 #3f4e60;
                }

                .ReactQueryDevtoolsPanel *::-webkit-scrollbar, .ReactQueryDevtoolsPanel scrollbar {
                  width: 1rem;
                  height: 1rem;
                }

                .ReactQueryDevtoolsPanel *::-webkit-scrollbar-track, .ReactQueryDevtoolsPanel scrollbar-track {
                  background: #132337;
                }

                .ReactQueryDevtoolsPanel *::-webkit-scrollbar-thumb, .ReactQueryDevtoolsPanel scrollbar-thumb {
                  background: #3f4e60;
                  border-radius: .5rem;
                  border: 3px solid #132337;
                }
              
          </style>
          <div
            style="position: absolute; left: 0px; top: 0px; width: 100%; height: 4px; margin-bottom: -4px; cursor: row-resize; z-index: 100000;"
          />
          <div
            style="flex: 1 1 500px; min-height: 40%; max-height: 100%; overflow: auto; border-right: 1px solid #222e3e; display: flex; flex-direction: column;"
          >
            <div
              style="padding: .5rem; background: rgb(19, 35, 55); display: flex; justify-content: space-between; align-items: center;"
            >
              <svg
                aria-hidden="true"
                height="40px"
                style="margin-right: .5rem;"
                version="1.1"
                viewBox="0 0 190 190"
                width="40px"
              >
                <g
                  fill="none"
                  fill-rule="evenodd"
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                >
                  <g
                    id="og-white"
                    transform="translate(-33.000000, 0.000000)"
                  >
                    <path
                      d="M72.7239712,61.3436237 C69.631224,46.362877 68.9675112,34.8727722 70.9666331,26.5293551 C72.1555965,21.5671678 74.3293088,17.5190846 77.6346064,14.5984631 C81.1241394,11.5150478 85.5360327,10.0020122 90.493257,10.0020122 C98.6712013,10.0020122 107.26826,13.7273214 116.455725,20.8044264 C120.20312,23.6910458 124.092437,27.170411 128.131651,31.2444746 C128.45314,30.8310265 128.816542,30.4410453 129.22143,30.0806152 C140.64098,19.9149716 150.255245,13.5989272 158.478408,11.1636507 C163.367899,9.715636 167.958526,9.57768202 172.138936,10.983031 C176.551631,12.4664684 180.06766,15.5329489 182.548314,19.8281091 C186.642288,26.9166735 187.721918,36.2310983 186.195595,47.7320243 C185.573451,52.4199112 184.50985,57.5263831 183.007094,63.0593153 C183.574045,63.1277086 184.142416,63.2532808 184.705041,63.4395297 C199.193932,68.2358678 209.453582,73.3937462 215.665021,79.2882839 C219.360669,82.7953831 221.773972,86.6998434 222.646365,91.0218204 C223.567176,95.5836746 222.669313,100.159332 220.191548,104.451297 C216.105211,111.529614 208.591643,117.11221 197.887587,121.534031 C193.589552,123.309539 188.726579,124.917559 183.293259,126.363748 C183.541176,126.92292 183.733521,127.516759 183.862138,128.139758 C186.954886,143.120505 187.618598,154.61061 185.619477,162.954027 C184.430513,167.916214 182.256801,171.964297 178.951503,174.884919 C175.46197,177.968334 171.050077,179.48137 166.092853,179.48137 C157.914908,179.48137 149.31785,175.756061 140.130385,168.678956 C136.343104,165.761613 132.410866,162.238839 128.325434,158.108619 C127.905075,158.765474 127.388968,159.376011 126.77857,159.919385 C115.35902,170.085028 105.744755,176.401073 97.5215915,178.836349 C92.6321009,180.284364 88.0414736,180.422318 83.8610636,179.016969 C79.4483686,177.533532 75.9323404,174.467051 73.4516862,170.171891 C69.3577116,163.083327 68.2780823,153.768902 69.8044053,142.267976 C70.449038,137.410634 71.56762,132.103898 73.1575891,126.339009 C72.5361041,126.276104 71.9120754,126.144816 71.2949591,125.940529 C56.8060684,121.144191 46.5464184,115.986312 40.3349789,110.091775 C36.6393312,106.584675 34.2260275,102.680215 33.3536352,98.3582381 C32.4328237,93.7963839 33.3306866,89.2207269 35.8084524,84.9287618 C39.8947886,77.8504443 47.4083565,72.2678481 58.1124133,67.8460273 C62.5385143,66.0176154 67.5637208,64.366822 73.1939394,62.8874674 C72.9933393,62.3969171 72.8349374,61.8811235 72.7239712,61.3436237 Z"
                      fill="#002C4B"
                      fill-rule="nonzero"
                      id="Path"
                      transform="translate(128.000000, 95.000000) scale(-1, 1) translate(-128.000000, -95.000000) "
                    />
                    <path
                      d="M113.396882,64 L142.608177,64 C144.399254,64 146.053521,64.958025 146.944933,66.5115174 L161.577138,92.0115174 C162.461464,93.5526583 162.461464,95.4473417 161.577138,96.9884826 L146.944933,122.488483 C146.053521,124.041975 144.399254,125 142.608177,125 L113.396882,125 C111.605806,125 109.951539,124.041975 109.060126,122.488483 L94.4279211,96.9884826 C93.543596,95.4473417 93.543596,93.5526583 94.4279211,92.0115174 L109.060126,66.5115174 C109.951539,64.958025 111.605806,64 113.396882,64 Z M138.987827,70.2765273 C140.779849,70.2765273 142.434839,71.2355558 143.325899,72.7903404 L154.343038,92.0138131 C155.225607,93.5537825 155.225607,95.4462175 154.343038,96.9861869 L143.325899,116.20966 C142.434839,117.764444 140.779849,118.723473 138.987827,118.723473 L117.017233,118.723473 C115.225211,118.723473 113.570221,117.764444 112.67916,116.20966 L101.662022,96.9861869 C100.779452,95.4462175 100.779452,93.5537825 101.662022,92.0138131 L112.67916,72.7903404 C113.570221,71.2355558 115.225211,70.2765273 117.017233,70.2765273 L138.987827,70.2765273 Z M135.080648,77.1414791 L120.924411,77.1414791 C119.134228,77.1414791 117.480644,78.0985567 116.5889,79.6508285 L116.5889,79.6508285 L109.489217,92.0093494 C108.603232,93.5515958 108.603232,95.4484042 109.489217,96.9906506 L109.489217,96.9906506 L116.5889,109.349172 C117.480644,110.901443 119.134228,111.858521 120.924411,111.858521 L120.924411,111.858521 L135.080648,111.858521 C136.870831,111.858521 138.524416,110.901443 139.41616,109.349172 L139.41616,109.349172 L146.515843,96.9906506 C147.401828,95.4484042 147.401828,93.5515958 146.515843,92.0093494 L146.515843,92.0093494 L139.41616,79.6508285 C138.524416,78.0985567 136.870831,77.1414791 135.080648,77.1414791 L135.080648,77.1414791 Z M131.319186,83.7122186 C133.108028,83.7122186 134.760587,84.6678753 135.652827,86.2183156 L138.983552,92.0060969 C139.87203,93.5500005 139.87203,95.4499995 138.983552,96.9939031 L135.652827,102.781684 C134.760587,104.332125 133.108028,105.287781 131.319186,105.287781 L124.685874,105.287781 C122.897032,105.287781 121.244473,104.332125 120.352233,102.781684 L117.021508,96.9939031 C116.13303,95.4499995 116.13303,93.5500005 117.021508,92.0060969 L120.352233,86.2183156 C121.244473,84.6678753 122.897032,83.7122186 124.685874,83.7122186 L131.319186,83.7122186 Z M128.003794,90.1848875 C126.459294,90.1848875 125.034382,91.0072828 124.263005,92.3424437 C123.491732,93.6774232 123.491732,95.3225768 124.263005,96.6575563 C125.034382,97.9927172 126.459294,98.8151125 128.001266,98.8151125 L128.001266,98.8151125 C129.545766,98.8151125 130.970678,97.9927172 131.742055,96.6575563 C132.513327,95.3225768 132.513327,93.6774232 131.742055,92.3424437 C130.970678,91.0072828 129.545766,90.1848875 128.003794,90.1848875 L128.003794,90.1848875 Z M93,94.5009646 L100.767764,94.5009646"
                      fill="#FFD94C"
                      id="Polygon-2"
                    />
                    <path
                      d="M87.8601729,108.357758 C89.1715224,107.608286 90.8360246,108.074601 91.5779424,109.399303 L91.5779424,109.399303 L92.0525843,110.24352 C95.8563392,116.982993 99.8190116,123.380176 103.940602,129.435068 C108.807881,136.585427 114.28184,143.82411 120.362479,151.151115 C121.316878,152.30114 121.184944,154.011176 120.065686,154.997937 L120.065686,154.997937 L119.454208,155.534625 C99.3465389,173.103314 86.2778188,176.612552 80.2480482,166.062341 C74.3500652,155.742717 76.4844915,136.982888 86.6513274,109.782853 C86.876818,109.179582 87.3045861,108.675291 87.8601729,108.357758 Z M173.534177,129.041504 C174.986131,128.785177 176.375496,129.742138 176.65963,131.194242 L176.65963,131.194242 L176.812815,131.986376 C181.782365,157.995459 178.283348,171 166.315764,171 C154.609745,171 139.708724,159.909007 121.612702,137.727022 C121.211349,137.235047 120.994572,136.617371 121,135.981509 C121.013158,134.480686 122.235785,133.274651 123.730918,133.287756 L123.730918,133.287756 L124.684654,133.294531 C132.305698,133.335994 139.714387,133.071591 146.910723,132.501323 C155.409039,131.82788 164.283523,130.674607 173.534177,129.041504 Z M180.408726,73.8119663 C180.932139,72.4026903 182.508386,71.6634537 183.954581,72.149012 L183.954581,72.149012 L184.742552,72.4154854 C210.583763,81.217922 220.402356,90.8916805 214.198332,101.436761 C208.129904,111.751366 190.484347,119.260339 161.26166,123.963678 C160.613529,124.067994 159.948643,123.945969 159.382735,123.618843 C158.047025,122.846729 157.602046,121.158214 158.388848,119.847438 L158.388848,119.847438 L158.889328,119.0105 C162.877183,112.31633 166.481358,105.654262 169.701854,99.0242957 C173.50501,91.1948179 177.073967,82.7907081 180.408726,73.8119663 Z M94.7383398,66.0363218 C95.3864708,65.9320063 96.0513565,66.0540315 96.6172646,66.3811573 C97.9529754,67.153271 98.3979538,68.8417862 97.6111517,70.1525615 L97.6111517,70.1525615 L97.1106718,70.9895001 C93.1228168,77.6836699 89.5186416,84.3457379 86.2981462,90.9757043 C82.49499,98.8051821 78.9260328,107.209292 75.5912744,116.188034 C75.0678608,117.59731 73.4916142,118.336546 72.045419,117.850988 L72.045419,117.850988 L71.2574475,117.584515 C45.4162372,108.782078 35.597644,99.1083195 41.8016679,88.5632391 C47.8700957,78.2486335 65.515653,70.7396611 94.7383398,66.0363218 Z M136.545792,34.4653746 C156.653461,16.8966864 169.722181,13.3874478 175.751952,23.9376587 C181.649935,34.2572826 179.515508,53.0171122 169.348673,80.2171474 C169.123182,80.8204179 168.695414,81.324709 168.139827,81.6422422 C166.828478,82.3917144 165.163975,81.9253986 164.422058,80.6006966 L164.422058,80.6006966 L163.947416,79.7564798 C160.143661,73.0170065 156.180988,66.6198239 152.059398,60.564932 C147.192119,53.4145727 141.71816,46.1758903 135.637521,38.8488847 C134.683122,37.6988602 134.815056,35.9888243 135.934314,35.0020629 L135.934314,35.0020629 Z M90.6842361,18 C102.390255,18 117.291276,29.0909926 135.387298,51.2729777 C135.788651,51.7649527 136.005428,52.3826288 136,53.0184911 C135.986842,54.5193144 134.764215,55.7253489 133.269082,55.7122445 L133.269082,55.7122445 L132.315346,55.7054689 C124.694302,55.6640063 117.285613,55.9284091 110.089277,56.4986773 C101.590961,57.17212 92.7164767,58.325393 83.4658235,59.9584962 C82.0138691,60.2148231 80.6245044,59.2578618 80.3403697,57.805758 L80.3403697,57.805758 L80.1871846,57.0136235 C75.2176347,31.0045412 78.7166519,18 90.6842361,18 Z"
                      fill="#FF4154"
                      id="Combined-Shape"
                    />
                  </g>
                </g>
              </svg>
              <div
                style="display: flex; flex-direction: column;"
              >
                <span
                  style="display: inline-block; font-size: 0.9em; margin-bottom: .5rem;"
                >
                  <span
                    style="display: inline-flex; align-items: center; padding: .2em .4em; font-weight: bold; text-shadow: 0 0 10px black; border-radius: .2em; background: rgb(0, 171, 82); opacity: 0.3;"
                  >
                    fresh 
                    <code
                      style="font-size: .9em;"
                    >
                      (
                      0
                      )
                    </code>
                  </span>
                   
                  <span
                    style="display: inline-flex; align-items: center; padding: .2em .4em; font-weight: bold; text-shadow: 0 0 10px black; border-radius: .2em; background: rgb(0, 107, 255); opacity: 0.3;"
                  >
                    fetching
                     
                    <code
                      style="font-size: .9em;"
                    >
                      (
                      0
                      )
                    </code>
                  </span>
                   
                  <span
                    style="display: inline-flex; align-items: center; padding: .2em .4em; font-weight: bold; text-shadow: 0; border-radius: .2em; background: rgb(255, 178, 0); color: black; opacity: 0.3;"
                  >
                    stale 
                    <code
                      style="font-size: .9em;"
                    >
                      (
                      0
                      )
                    </code>
                  </span>
                   
                  <span
                    style="display: inline-flex; align-items: center; padding: .2em .4em; font-weight: bold; text-shadow: 0 0 10px black; border-radius: .2em; background: rgb(63, 78, 96); opacity: 0.3;"
                  >
                    inactive
                     
                    <code
                      style="font-size: .9em;"
                    >
                      (
                      0
                      )
                    </code>
                  </span>
                </span>
                <div
                  style="display: flex; align-items: center;"
                >
                  <input
                    placeholder="Filter"
                    style="background-color: rgb(255, 255, 255); border: 0px; border-radius: .2em; color: rgb(0, 0, 0); font-size: .9em; line-height: 1.3; padding: .3em .4em; flex: 1; margin-right: .5rem;"
                    value=""
                  />
                  <select
                    style="display: inline-block; font-size: .9em; font-family: sans-serif; font-weight: normal; line-height: 1.3; padding: .3em 1.5em .3em .5em; height: auto; border: 0px; border-radius: .2em; appearance: none; background-color: rgb(255, 255, 255); background-repeat: no-repeat; background-size: .65em auto, 100%; color: rgb(0, 0, 0); flex: 1; min-width: 75px; margin-right: .5rem;"
                  >
                    <option
                      value="Status > Last Updated"
                    >
                      Sort by Status &gt; Last Updated
                    </option>
                    <option
                      value="Query Hash"
                    >
                      Sort by Query Hash
                    </option>
                    <option
                      value="Last Updated"
                    >
                      Sort by Last Updated
                    </option>
                  </select>
                  <button
                    style="appearance: none; font-size: .9em; font-weight: bold; background: rgb(63, 78, 96); border: 0px; border-radius: .3em; color: white; padding: .3rem .4rem; cursor: pointer;"
                    type="button"
                  >
                    ⬆ Asc
                  </button>
                </div>
              </div>
            </div>
            <div
              style="overflow-y: auto; flex: 1;"
            />
          </div>
        </div>
        <button
          aria-label="Open React Query Devtools"
          style="background: none; border: 0px; padding: 0px; position: fixed; z-index: 99999; display: inline-flex; font-size: 1.5rem; margin: .5rem; cursor: pointer; bottom: 0px; left: 0px;"
          type="button"
        >
          <svg
            aria-hidden="true"
            height="40px"
            version="1.1"
            viewBox="0 0 190 190"
            width="40px"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              id="Page-1"
              stroke="none"
              stroke-width="1"
            >
              <g
                id="og-white"
                transform="translate(-33.000000, 0.000000)"
              >
                <path
                  d="M72.7239712,61.3436237 C69.631224,46.362877 68.9675112,34.8727722 70.9666331,26.5293551 C72.1555965,21.5671678 74.3293088,17.5190846 77.6346064,14.5984631 C81.1241394,11.5150478 85.5360327,10.0020122 90.493257,10.0020122 C98.6712013,10.0020122 107.26826,13.7273214 116.455725,20.8044264 C120.20312,23.6910458 124.092437,27.170411 128.131651,31.2444746 C128.45314,30.8310265 128.816542,30.4410453 129.22143,30.0806152 C140.64098,19.9149716 150.255245,13.5989272 158.478408,11.1636507 C163.367899,9.715636 167.958526,9.57768202 172.138936,10.983031 C176.551631,12.4664684 180.06766,15.5329489 182.548314,19.8281091 C186.642288,26.9166735 187.721918,36.2310983 186.195595,47.7320243 C185.573451,52.4199112 184.50985,57.5263831 183.007094,63.0593153 C183.574045,63.1277086 184.142416,63.2532808 184.705041,63.4395297 C199.193932,68.2358678 209.453582,73.3937462 215.665021,79.2882839 C219.360669,82.7953831 221.773972,86.6998434 222.646365,91.0218204 C223.567176,95.5836746 222.669313,100.159332 220.191548,104.451297 C216.105211,111.529614 208.591643,117.11221 197.887587,121.534031 C193.589552,123.309539 188.726579,124.917559 183.293259,126.363748 C183.541176,126.92292 183.733521,127.516759 183.862138,128.139758 C186.954886,143.120505 187.618598,154.61061 185.619477,162.954027 C184.430513,167.916214 182.256801,171.964297 178.951503,174.884919 C175.46197,177.968334 171.050077,179.48137 166.092853,179.48137 C157.914908,179.48137 149.31785,175.756061 140.130385,168.678956 C136.343104,165.761613 132.410866,162.238839 128.325434,158.108619 C127.905075,158.765474 127.388968,159.376011 126.77857,159.919385 C115.35902,170.085028 105.744755,176.401073 97.5215915,178.836349 C92.6321009,180.284364 88.0414736,180.422318 83.8610636,179.016969 C79.4483686,177.533532 75.9323404,174.467051 73.4516862,170.171891 C69.3577116,163.083327 68.2780823,153.768902 69.8044053,142.267976 C70.449038,137.410634 71.56762,132.103898 73.1575891,126.339009 C72.5361041,126.276104 71.9120754,126.144816 71.2949591,125.940529 C56.8060684,121.144191 46.5464184,115.986312 40.3349789,110.091775 C36.6393312,106.584675 34.2260275,102.680215 33.3536352,98.3582381 C32.4328237,93.7963839 33.3306866,89.2207269 35.8084524,84.9287618 C39.8947886,77.8504443 47.4083565,72.2678481 58.1124133,67.8460273 C62.5385143,66.0176154 67.5637208,64.366822 73.1939394,62.8874674 C72.9933393,62.3969171 72.8349374,61.8811235 72.7239712,61.3436237 Z"
                  fill="#002C4B"
                  fill-rule="nonzero"
                  id="Path"
                  transform="translate(128.000000, 95.000000) scale(-1, 1) translate(-128.000000, -95.000000) "
                />
                <path
                  d="M113.396882,64 L142.608177,64 C144.399254,64 146.053521,64.958025 146.944933,66.5115174 L161.577138,92.0115174 C162.461464,93.5526583 162.461464,95.4473417 161.577138,96.9884826 L146.944933,122.488483 C146.053521,124.041975 144.399254,125 142.608177,125 L113.396882,125 C111.605806,125 109.951539,124.041975 109.060126,122.488483 L94.4279211,96.9884826 C93.543596,95.4473417 93.543596,93.5526583 94.4279211,92.0115174 L109.060126,66.5115174 C109.951539,64.958025 111.605806,64 113.396882,64 Z M138.987827,70.2765273 C140.779849,70.2765273 142.434839,71.2355558 143.325899,72.7903404 L154.343038,92.0138131 C155.225607,93.5537825 155.225607,95.4462175 154.343038,96.9861869 L143.325899,116.20966 C142.434839,117.764444 140.779849,118.723473 138.987827,118.723473 L117.017233,118.723473 C115.225211,118.723473 113.570221,117.764444 112.67916,116.20966 L101.662022,96.9861869 C100.779452,95.4462175 100.779452,93.5537825 101.662022,92.0138131 L112.67916,72.7903404 C113.570221,71.2355558 115.225211,70.2765273 117.017233,70.2765273 L138.987827,70.2765273 Z M135.080648,77.1414791 L120.924411,77.1414791 C119.134228,77.1414791 117.480644,78.0985567 116.5889,79.6508285 L116.5889,79.6508285 L109.489217,92.0093494 C108.603232,93.5515958 108.603232,95.4484042 109.489217,96.9906506 L109.489217,96.9906506 L116.5889,109.349172 C117.480644,110.901443 119.134228,111.858521 120.924411,111.858521 L120.924411,111.858521 L135.080648,111.858521 C136.870831,111.858521 138.524416,110.901443 139.41616,109.349172 L139.41616,109.349172 L146.515843,96.9906506 C147.401828,95.4484042 147.401828,93.5515958 146.515843,92.0093494 L146.515843,92.0093494 L139.41616,79.6508285 C138.524416,78.0985567 136.870831,77.1414791 135.080648,77.1414791 L135.080648,77.1414791 Z M131.319186,83.7122186 C133.108028,83.7122186 134.760587,84.6678753 135.652827,86.2183156 L138.983552,92.0060969 C139.87203,93.5500005 139.87203,95.4499995 138.983552,96.9939031 L135.652827,102.781684 C134.760587,104.332125 133.108028,105.287781 131.319186,105.287781 L124.685874,105.287781 C122.897032,105.287781 121.244473,104.332125 120.352233,102.781684 L117.021508,96.9939031 C116.13303,95.4499995 116.13303,93.5500005 117.021508,92.0060969 L120.352233,86.2183156 C121.244473,84.6678753 122.897032,83.7122186 124.685874,83.7122186 L131.319186,83.7122186 Z M128.003794,90.1848875 C126.459294,90.1848875 125.034382,91.0072828 124.263005,92.3424437 C123.491732,93.6774232 123.491732,95.3225768 124.263005,96.6575563 C125.034382,97.9927172 126.459294,98.8151125 128.001266,98.8151125 L128.001266,98.8151125 C129.545766,98.8151125 130.970678,97.9927172 131.742055,96.6575563 C132.513327,95.3225768 132.513327,93.6774232 131.742055,92.3424437 C130.970678,91.0072828 129.545766,90.1848875 128.003794,90.1848875 L128.003794,90.1848875 Z M93,94.5009646 L100.767764,94.5009646"
                  fill="#FFD94C"
                  id="Polygon-2"
                />
                <path
                  d="M87.8601729,108.357758 C89.1715224,107.608286 90.8360246,108.074601 91.5779424,109.399303 L91.5779424,109.399303 L92.0525843,110.24352 C95.8563392,116.982993 99.8190116,123.380176 103.940602,129.435068 C108.807881,136.585427 114.28184,143.82411 120.362479,151.151115 C121.316878,152.30114 121.184944,154.011176 120.065686,154.997937 L120.065686,154.997937 L119.454208,155.534625 C99.3465389,173.103314 86.2778188,176.612552 80.2480482,166.062341 C74.3500652,155.742717 76.4844915,136.982888 86.6513274,109.782853 C86.876818,109.179582 87.3045861,108.675291 87.8601729,108.357758 Z M173.534177,129.041504 C174.986131,128.785177 176.375496,129.742138 176.65963,131.194242 L176.65963,131.194242 L176.812815,131.986376 C181.782365,157.995459 178.283348,171 166.315764,171 C154.609745,171 139.708724,159.909007 121.612702,137.727022 C121.211349,137.235047 120.994572,136.617371 121,135.981509 C121.013158,134.480686 122.235785,133.274651 123.730918,133.287756 L123.730918,133.287756 L124.684654,133.294531 C132.305698,133.335994 139.714387,133.071591 146.910723,132.501323 C155.409039,131.82788 164.283523,130.674607 173.534177,129.041504 Z M180.408726,73.8119663 C180.932139,72.4026903 182.508386,71.6634537 183.954581,72.149012 L183.954581,72.149012 L184.742552,72.4154854 C210.583763,81.217922 220.402356,90.8916805 214.198332,101.436761 C208.129904,111.751366 190.484347,119.260339 161.26166,123.963678 C160.613529,124.067994 159.948643,123.945969 159.382735,123.618843 C158.047025,122.846729 157.602046,121.158214 158.388848,119.847438 L158.388848,119.847438 L158.889328,119.0105 C162.877183,112.31633 166.481358,105.654262 169.701854,99.0242957 C173.50501,91.1948179 177.073967,82.7907081 180.408726,73.8119663 Z M94.7383398,66.0363218 C95.3864708,65.9320063 96.0513565,66.0540315 96.6172646,66.3811573 C97.9529754,67.153271 98.3979538,68.8417862 97.6111517,70.1525615 L97.6111517,70.1525615 L97.1106718,70.9895001 C93.1228168,77.6836699 89.5186416,84.3457379 86.2981462,90.9757043 C82.49499,98.8051821 78.9260328,107.209292 75.5912744,116.188034 C75.0678608,117.59731 73.4916142,118.336546 72.045419,117.850988 L72.045419,117.850988 L71.2574475,117.584515 C45.4162372,108.782078 35.597644,99.1083195 41.8016679,88.5632391 C47.8700957,78.2486335 65.515653,70.7396611 94.7383398,66.0363218 Z M136.545792,34.4653746 C156.653461,16.8966864 169.722181,13.3874478 175.751952,23.9376587 C181.649935,34.2572826 179.515508,53.0171122 169.348673,80.2171474 C169.123182,80.8204179 168.695414,81.324709 168.139827,81.6422422 C166.828478,82.3917144 165.163975,81.9253986 164.422058,80.6006966 L164.422058,80.6006966 L163.947416,79.7564798 C160.143661,73.0170065 156.180988,66.6198239 152.059398,60.564932 C147.192119,53.4145727 141.71816,46.1758903 135.637521,38.8488847 C134.683122,37.6988602 134.815056,35.9888243 135.934314,35.0020629 L135.934314,35.0020629 Z M90.6842361,18 C102.390255,18 117.291276,29.0909926 135.387298,51.2729777 C135.788651,51.7649527 136.005428,52.3826288 136,53.0184911 C135.986842,54.5193144 134.764215,55.7253489 133.269082,55.7122445 L133.269082,55.7122445 L132.315346,55.7054689 C124.694302,55.6640063 117.285613,55.9284091 110.089277,56.4986773 C101.590961,57.17212 92.7164767,58.325393 83.4658235,59.9584962 C82.0138691,60.2148231 80.6245044,59.2578618 80.3403697,57.805758 L80.3403697,57.805758 L80.1871846,57.0136235 C75.2176347,31.0045412 78.7166519,18 90.6842361,18 Z"
                  fill="#FF4154"
                  id="Combined-Shape"
                />
              </g>
            </g>
          </svg>
        </button>
      </footer>
    </div>
  `);
});

test('render form with role_name', async () => {
  await render(<RoleForm initialValues={roleFormDefaultValue} />);

  const roleNameInput = screen.getByLabelText('角色名称');
  userEvent.click(roleNameInput);
  expect(roleNameInput).toHaveFocus();
});
