import{_ as s,o as i,c as a,a6 as n}from"./chunks/framework.Bna9RZrE.js";const o=JSON.parse('{"title":"Android证书生成","description":"","frontmatter":{"title":"Android证书生成","date":"2022-05-21 17:26:59","sidebar":false,"categories":["其他"],"tags":["Android","其他"],"publish":true},"headers":[],"relativePath":"other/androidKeystore.md","filePath":"other/androidKeystore.md","lastUpdated":1740970622000}'),l={name:"other/androidKeystore.md"},t=n(`<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># test.keystore是证书文件名称，可修改为自己想设置的文件名称</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">keytool</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -genkey</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -alias</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> testalias</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -keyalg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> RSA</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -keysize</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2048</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -validity</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 36500</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -keystore</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.keystore</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 控制台说明</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Enter keystore password:  //输入证书文件密码，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Re-enter new password:   //再次输入证书文件密码，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># What is your first and last name?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [Unknown]:  //输入名字和姓氏，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># What is the name of your organizational unit?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [Unknown]:  //输入组织单位名称，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># What is the name of your organization?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [Unknown]:  //输入组织名称，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># What is the name of your City or Locality?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [Unknown]:  //输入城市或区域名称，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># What is the name of your State or Province?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [Unknown]:  //输入省/市/自治区名称，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># What is the two-letter country code for this unit?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [Unknown]:  //输入国家/地区代号（两个字母），中国为CN，输入完成回车  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   [no]:  //确认上面输入的内容是否正确，输入y，回车  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Enter key password for &lt;testalias&gt;  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># (RETURN if same as keystore password):  //确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看证书信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">keytool</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -keystore</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.keystore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 控制台说明</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Enter keystore password: //输入密码，回车</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Keystore type: PKCS12    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Keystore provider: SUN    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Your keystore contains 1 entry    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Alias name: test    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Creation date: 2019-10-28    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Entry type: PrivateKeyEntry    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Certificate chain length: 1    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Certificate[1]:    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Owner: CN=Tester, OU=Test, O=Test, L=HD, ST=BJ, C=CN    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Issuer: CN=Tester, OU=Test, O=Test, L=HD, ST=BJ, C=CN    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Serial number: 7dd12840    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Valid from: Fri Jul 26 20:52:56 CST 2019 until: Sun Jul 02 20:52:56 CST 2119    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Certificate fingerprints:    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    MD5:  F9:F6:C8:1F:DB:AB:50:14:7D:6F:2C:4F:CE:E6:0A:A5    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    SHA1: BB:AC:E2:2F:97:3B:18:02:E7:D6:69:A3:7A:28:EF:D2:3F:A3:68:E7    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    SHA256: 24:11:7D:E7:36:12:BC:FE:AF:2A:6A:24:BD:04:4F:2E:33:E5:2D:41:96:5F:50:4D:74:17:7F:4F:E2:55:EB:26    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Signature algorithm name: SHA256withRSA    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Subject Public Key Algorithm: 2048-bit RSA key    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Version: 3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 注意</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 其中证书指纹信息（Certificate fingerprints）：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   ● MD5</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 证书的MD5指纹信息（安全码MD5）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   ● SHA1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 证书的SHA1指纹信息（安全码SHA1）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   ● SHA256</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 证书的SHA256指纹信息（安全码SHA245）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 注意</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jdk13没有md5,只有sha1和sha256,我更换了jdk8</span></span></code></pre></div>`,1),e=[t];function p(h,k,r,A,d,D){return i(),a("div",{"data-pagefind-body":!0},e)}const c=s(l,[["render",p]]);export{o as __pageData,c as default};
