<script setup>
import { ref, reactive } from 'vue';

const toggle=ref(true)

const items = reactive([
    { text: 'My Files', icon: 'mdi-folder' },
    { text: 'Shared with me', icon: 'mdi-account-multiple' },
    { text: 'Starred', icon: 'mdi-star' },
    { text: 'Recent', icon: 'mdi-history' },
    { text: 'Offline', icon: 'mdi-check-circle' },
    { text: 'Uploads', icon: 'mdi-upload' },
    { text: 'Backups', icon: 'mdi-cloud-upload' },
]);
</script>


<template>
    <v-layout>
    <v-navigation-drawer
        v-model="toggle"
        temporary
        color="grey-darken-3"
    >
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
                <template v-slot:append>
                    <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                </template>
                <v-list-item-title class="text-overline font-weight-black"> cloud </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                    system
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list :lines="false" density="compact" nav>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <!-- <v-btn size="x-small" :icon="settingStore.switchIcon" @click="switchTheme"> </v-btn>
            <v-btn size="x-small" icon="mdi-cog" @click="settings.showSetting = !settings.showSetting"> </v-btn> -->
            <v-divider></v-divider>
            <v-list :lines="false" density="compact" nav>
                <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
    <v-main>
        <div class="pa-4">
            <v-btn @click="toggle=!toggle">toggle</v-btn>
            <!-- style="overflow-x: scroll" -->
            <p>
                <!-- style="width: 400vw" -->
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex molestiae exercitationem accusamus fugit
                in! Facere, eos fugiat aut, nisi fuga vitae similique dicta voluptates alias rem delectus aliquam
                asperiores eveniet aperiam distinctio dolor. Qui voluptates dicta, dolorum mollitia officiis cumque,
                similique fugiat, laudantium illum debitis quo exercitationem dolor ex animi impedit amet. Officiis
                necessitatibus ut aut voluptatum omnis commodi, magni rem sunt amet harum! Minus mollitia minima
                asperiores commodi architecto ab beatae laboriosam quis nemo, saepe, deserunt totam molestiae
                perferendis quasi. Sunt aliquid impedit, rerum sapiente nostrum aut iste expedita similique quo
                nesciunt! Ea, rem ullam! Repellat odit non perferendis saepe assumenda dolorum, velit sed. Ea odio
                voluptatum, eos quidem itaque sed quaerat officiis non voluptatem assumenda velit harum quod tempore
                modi nesciunt voluptate ex sunt adipisci commodi sapiente perspiciatis quis? Quo reprehenderit minima
                amet similique maxime sequi earum perferendis quos, eveniet maiores sint non commodi voluptas deleniti
                at minus natus excepturi animi rerum temporibus. Quae perspiciatis ipsam illum! At explicabo sit
                cupiditate quis voluptate similique, veritatis odit iure eius voluptates necessitatibus debitis dolor
                quam aliquam ducimus blanditiis reiciendis ut? Culpa inventore repudiandae officia? Iste reprehenderit
                quam architecto accusamus, obcaecati quae ex accusantium commodi dolorum. Assumenda quis molestiae et
                qui eligendi consequuntur tempora illo impedit? Omnis facilis maxime quos sapiente eos. Voluptatem nobis
                ipsam atque repellat eius assumenda a omnis commodi praesentium! Numquam atque inventore modi ipsa, est
                ipsam tenetur omnis excepturi dolores ratione earum eligendi, itaque corrupti dolor iste illo
                perspiciatis alias dicta molestias. Ex pariatur, tempora aliquid doloremque libero perferendis itaque!
                Laborum cum non, sed incidunt delectus iusto eos soluta, ut maiores fuga error quos doloremque quia
                accusamus aspernatur quis neque commodi alias voluptates est laboriosam nostrum minus corporis dolorum.
                Odit veritatis similique repellendus, consequatur ratione recusandae culpa autem officiis aliquam
                doloremque cum error enim natus totam. Neque modi tempora quisquam, excepturi quaerat tenetur quasi non
                sit ipsum, placeat sapiente facere, corporis consequatur dolorem distinctio perferendis debitis fugiat
                officiis velit ea numquam officia? Magni, totam. Asperiores veniam saepe qui totam sequi eaque possimus
                culpa beatae quasi a at quisquam porro harum recusandae reiciendis amet pariatur, enim illo ipsam
                delectus expedita accusantium doloremque deserunt? Totam eius quae placeat ut vitae illo corporis
                dolorem architecto repellat quia quod accusamus obcaecati repudiandae, dolore iure. Voluptatibus qui
                necessitatibus consectetur eaque tempora nihil beatae magnam molestias nemo et aliquam architecto odit,
                pariatur fuga inventore repellendus. Dolores ab et nisi, odio repudiandae sit assumenda dolorum nihil
                adipisci sunt aut error illum quidem labore minus deserunt, vero, nam voluptatibus dolore? Consequuntur,
                amet aperiam praesentium voluptatem optio officia ipsa doloremque debitis. Fuga facere eos nesciunt
                deserunt magnam id, distinctio voluptatem sint a voluptatum assumenda necessitatibus, harum pariatur? Ut
                doloribus, id iusto doloremque eos fuga ducimus ullam asperiores veritatis dolorum reprehenderit,
                beatae, maiores ex? Adipisci eum non, hic et asperiores culpa laboriosam, expedita doloremque iusto sit
                temporibus, tempora ad ipsa ut! Suscipit maxime rem incidunt repudiandae, quibusdam voluptas
                necessitatibus magni omnis aliquid! Quidem voluptatibus dolor qui et facere fugiat dolorem numquam.
                Quod, necessitatibus? Placeat magnam sequi ut aut ducimus nobis consectetur quae! Illo laudantium modi
                aliquid quidem odit quo iusto quis, laboriosam ratione. Odio veniam obcaecati error repellat qui
                voluptates ducimus dolor aperiam autem natus ex, quidem vitae quasi suscipit veritatis ullam impedit
                quisquam reprehenderit omnis asperiores dolore corporis laboriosam illo. Ratione eius maiores similique
                nobis a quae harum consequuntur error incidunt eligendi facere quos quisquam, iste dicta possimus
                tempora rerum, consequatur vitae alias sit nostrum non repudiandae? Iusto vel suscipit obcaecati quo.
                Quod labore et eos ipsam necessitatibus provident, eaque obcaecati accusamus deleniti in quia error
                veritatis alias molestias. Odio consectetur ab nemo rem corrupti obcaecati sapiente provident repellat
                minus dolorem beatae aperiam assumenda, velit ipsum. Sit, pariatur veniam inventore eum totam atque
                incidunt commodi fugit quibusdam recusandae quam animi id dignissimos ducimus aut dolorem doloremque
                asperiores consectetur. Nisi quos aliquam quasi mollitia vero beatae dolorum. Iusto facere unde omnis
                blanditiis fugit non quaerat in quidem aliquid, repellendus facilis eveniet magnam cupiditate vel ex
                molestiae tenetur ullam animi earum ipsam libero? At, perferendis. Repellendus dolor quos assumenda esse
                dolore ipsa vitae unde distinctio, ut perferendis hic laborum, fuga excepturi cum at optio iusto, modi
                et cupiditate! Minus reiciendis laboriosam adipisci corrupti maxime mollitia est eos dolor aspernatur
                quo ipsam id officiis consequuntur accusamus quibusdam excepturi ratione, reprehenderit porro ipsa sint
                animi iure! Inventore esse quae numquam modi minus dolores unde incidunt ullam animi harum quibusdam
                deleniti, accusantium illo ad officiis. Harum, nam consequatur. Obcaecati incidunt non nisi, saepe porro
                molestias sunt dolorem ducimus? Ullam magni, voluptate sunt debitis, modi dicta harum neque id odio
                accusantium quia cupiditate magnam. Perferendis, magni. Doloremque nostrum ullam neque qui cum
                dignissimos omnis nobis odio, explicabo sequi dolores ipsum? Dolorum sunt doloribus accusamus adipisci
                similique, deleniti quos magnam ducimus nam repellendus perferendis aperiam eligendi, veritatis fugiat
                asperiores doloremque iusto dolorem consequuntur nihil? Perspiciatis repudiandae nostrum sint soluta ab
                corrupti iusto totam, cumque dolore. Cumque, eaque maiores. Repellendus sequi atque dolore quibusdam
                magni accusamus consequatur consequuntur beatae provident, nemo, veritatis tempora enim dolorem
                molestias nulla aliquid tempore! Fugit numquam totam, rerum asperiores vel minima excepturi consectetur
                impedit. Voluptatum incidunt officia magnam neque nostrum facere perspiciatis voluptates corrupti dolore
                ad ut quas eos fuga eveniet saepe, aliquam, non minima totam eaque quaerat praesentium odit ex sapiente.
                Omnis eveniet sed molestias architecto ipsum deleniti fugiat ipsam tempore alias aspernatur et quas nisi
                illo modi impedit neque, natus voluptates repudiandae dolore dolor porro quaerat? Dicta earum saepe
                eligendi veniam, itaque eum exercitationem ab perspiciatis ducimus cumque perferendis architecto et!
                Aliquid soluta odio, quae velit aperiam aut repellat beatae dignissimos quis tenetur neque? Tenetur
                nesciunt ullam, optio accusantium deleniti quod labore illo laudantium quas maxime, non commodi!
                Voluptate in cum doloremque perferendis, reiciendis deserunt voluptatem veniam enim, necessitatibus odit
                sed animi aspernatur saepe distinctio corrupti vero optio suscipit officia nulla dolor molestias tenetur
                alias laudantium. Consequuntur architecto velit natus suscipit, a optio ea explicabo odit, vel
                consequatur labore similique, illum assumenda sint vitae ipsam officia exercitationem! Praesentium
                magnam veritatis eius voluptate aliquam. Autem id eveniet provident quod nam. Minima, labore.
                Consequatur, repellendus? Molestias aperiam amet velit expedita nemo fugit laboriosam odio quod, magnam
                obcaecati iure eaque, magni iste eos ad laborum deleniti doloribus voluptas fuga. Possimus quod fugiat
                magnam aliquam consequatur deserunt aspernatur assumenda, illo tenetur? Minus perspiciatis repellat vero
                expedita assumenda hic, harum amet, consectetur ad laudantium blanditiis temporibus delectus quos
                officiis aspernatur. Nulla, iure vel deleniti rem libero sunt pariatur nisi quasi maxime modi
                necessitatibus dicta perspiciatis nam doloribus assumenda. At dignissimos in accusamus magni reiciendis
                maxime debitis totam minima iusto incidunt, deserunt consectetur quia dolores libero magnam cupiditate
                ducimus assumenda? Quisquam, cupiditate voluptas. Aut repellat pariatur minima veritatis expedita neque
                provident excepturi quibusdam libero nam? Fugit possimus aspernatur neque et illum eaque maiores dolorem
                eligendi eius repellat quod eveniet magnam officiis voluptatem praesentium vero voluptatibus alias
                veritatis ullam, blanditiis illo laboriosam in obcaecati. Officiis quos dolor vero aut, temporibus
                quibusdam rem qui sequi, nostrum iure explicabo enim aperiam veniam alias ullam incidunt laudantium
                necessitatibus! Veniam inventore porro tempore? Odio provident unde minima aspernatur officia dolor
                repellat quam optio quidem accusamus eveniet porro sapiente, id libero nihil numquam corrupti
                exercitationem natus suscipit omnis vel perferendis est quae necessitatibus. Voluptatem vel illum
                quidem? Magnam, distinctio? Voluptatibus sed error officiis amet maiores iusto laudantium ea alias.
                Itaque nostrum, quo, ipsam voluptas assumenda quia deserunt fuga porro, cumque animi consequatur.
                Necessitatibus unde velit natus molestias quia similique dolorem excepturi laboriosam magni explicabo
                perferendis reprehenderit odit repellendus nesciunt, qui voluptas fugit minima eius cupiditate quae
                accusamus sapiente vel atque. Ad accusamus placeat reprehenderit sunt, optio ullam magnam ea hic quis
                labore, dolorem esse tempora deserunt aut deleniti fuga, eligendi nihil mollitia atque? Similique,
                nulla. Sit laborum error delectus eaque incidunt. Iure, eius dolor! Excepturi id officiis aspernatur
                illo provident voluptatibus quod est culpa. Iusto dignissimos ad quos suscipit dolorum libero
                consectetur necessitatibus consequatur blanditiis et modi ipsum ut sit deserunt, velit quis at cumque
                minima repudiandae! Ducimus, quod tempora numquam dolor ea tenetur repellendus. Fugit a, voluptate
                suscipit accusantium repellat illum explicabo rem optio architecto eaque accusamus reiciendis rerum
                atque, nostrum repellendus provident natus ea, quaerat deserunt qui asperiores? Aut, deleniti rem
                laboriosam optio nostrum minus maiores provident, perferendis, repudiandae quaerat architecto velit
                doloribus ex accusantium doloremque quod labore cumque numquam placeat omnis? Itaque tempore quas
                officiis recusandae nulla quis fugit architecto odit voluptatum sed facilis quaerat accusamus, debitis
                iusto iste explicabo delectus eum error obcaecati. Vero deleniti reprehenderit eligendi quos, hic earum
                magnam minus unde qui illo fugiat mollitia sed fugit itaque nemo deserunt possimus magni accusamus
                architecto quis ipsum. Ut, molestias cum magnam similique esse aspernatur eos sint velit quos non totam
                hic tenetur ipsum, id sunt, saepe fuga enim vero dolorum ducimus animi amet eius sapiente? Vero deleniti
                accusantium ea odit consequuntur voluptates a iste maxime, quidem pariatur maiores odio, consectetur
                repellendus expedita recusandae ipsa praesentium. Aut, nulla? Quos tempore consequuntur, tenetur labore
                explicabo dignissimos iusto optio blanditiis mollitia officia provident esse beatae deleniti quod
                voluptate enim, at nobis! Eius laboriosam quas error libero culpa omnis, sunt fugit, voluptatum tempore
                dignissimos in quod quasi beatae reprehenderit obcaecati quos. Quod quae, deleniti quibusdam cupiditate
                aliquid error modi labore quidem eaque dolore tenetur animi at, itaque nemo consequatur ea nesciunt
                quisquam dignissimos, ratione illo sit eveniet! Sequi dignissimos fugit laboriosam. Repudiandae,
                excepturi. Vitae sunt fuga doloribus cumque, assumenda, facilis et maiores, vel itaque mollitia
                consequuntur vero iusto fugit voluptas officiis omnis similique atque necessitatibus autem tempore minus
                alias odio molestiae temporibus. Expedita, commodi repudiandae quaerat eligendi delectus autem itaque
                earum eveniet ullam neque error suscipit dolores, harum excepturi praesentium nesciunt. Placeat
                temporibus, ducimus asperiores iure illum esse distinctio maiores ab nostrum sunt maxime soluta quasi
                unde consequuntur suscipit laudantium ullam nam explicabo tenetur sapiente. Error expedita nobis
                mollitia quam tenetur, fugiat illum natus pariatur quos labore iste totam inventore sed vel
                reprehenderit consectetur minima id cum aliquid autem ullam dignissimos impedit eveniet. Nostrum
                incidunt hic at? Cumque maiores voluptatum nobis, delectus corrupti, in saepe possimus molestiae esse
                natus, a molestias quo dolorum asperiores obcaecati. In aperiam unde eveniet fugit est at officia fugiat
                inventore, voluptates quidem porro, enim dolorum non, quam aspernatur hic voluptatibus cumque. Ipsam
                suscipit doloremque nisi voluptatem impedit. At, harum? Vero non blanditiis repellat quam reprehenderit
                neque, id voluptate dolor sint atque iste nobis facere ipsa cumque omnis, consequuntur earum! Reiciendis
                iusto obcaecati temporibus autem consequuntur asperiores fuga adipisci praesentium consequatur, dolore
                repellat corporis ea necessitatibus dignissimos nemo laboriosam perferendis similique molestias, laborum
                tempore illo, itaque ut hic natus? Libero qui, commodi magni fugit officiis aspernatur cumque aut
                aliquam, eaque quam tempora doloremque exercitationem! Explicabo tempora iure soluta officia architecto
                voluptatibus debitis reiciendis nobis aperiam similique distinctio eligendi, dolorum harum doloribus
                odit, inventore dicta aut alias rem ipsa! Cupiditate explicabo et dignissimos unde ratione optio
                aspernatur sapiente quos libero nemo sed, debitis a delectus, accusamus dolor doloremque quibusdam
                dolores iure distinctio velit, qui voluptatem! Eveniet consequatur recusandae ea harum asperiores,
                architecto vel quia odio repudiandae facere sit corrupti maxime illum tenetur odit minima fugiat ut
                cumque nulla impedit eum ducimus aut corporis. Voluptas similique exercitationem asperiores suscipit
                labore, laborum repellat aspernatur eius reiciendis facere laboriosam cumque facilis inventore nisi fuga
                voluptate quaerat dignissimos, ullam accusantium illo! Dolorem fugiat inventore provident ullam
                blanditiis, nihil modi officia quia distinctio ea consequatur error quisquam enim eveniet, facere amet
                possimus excepturi libero rem laboriosam quae non. Adipisci velit nisi ipsam debitis inventore
                laudantium tenetur eligendi quos esse earum similique soluta fugiat officiis dolores ex beatae, sed
                exercitationem quod, ad nesciunt at commodi, possimus minima ducimus. Exercitationem vero atque
                doloribus quam adipisci dicta et ullam ad quos, id impedit molestiae fugit nostrum consectetur porro
                quaerat quibusdam suscipit voluptates ea possimus magnam hic rem ab explicabo! Enim maiores sint
                deleniti accusamus voluptatibus quaerat, praesentium veniam facilis saepe blanditiis soluta hic
                recusandae tenetur quo excepturi perferendis assumenda est odit distinctio totam. Culpa id, ducimus
                ipsum voluptates velit rerum, facilis odio expedita tempore esse quisquam, veniam dolorem consectetur
                est corporis reiciendis animi sit fuga quis possimus quo similique libero? Labore molestias porro ipsam
                cupiditate quia nobis sapiente animi iste perferendis amet, dolorum dolores tempore, modi consequatur.
                Reiciendis debitis adipisci quam porro eaque molestiae consequatur impedit cumque, necessitatibus
                cupiditate totam ex iste eos libero asperiores voluptatibus mollitia praesentium inventore eveniet
                sapiente? Dolorem mollitia ducimus similique quisquam eum fugiat! Nihil incidunt aspernatur non ex
                dolorum praesentium itaque, eius repellat quaerat laborum pariatur perferendis neque nisi quia quidem
                aperiam distinctio adipisci expedita sapiente, voluptatibus modi deleniti voluptas sunt mollitia.
                Consectetur placeat voluptas soluta quibusdam necessitatibus adipisci rerum fuga exercitationem,
                blanditiis incidunt nihil omnis aspernatur esse, nobis deleniti dicta mollitia recusandae corrupti.
                Quidem adipisci numquam tempore ipsam velit sunt, qui totam id sapiente animi beatae fuga dolorum
                corrupti assumenda quam quas dignissimos iure possimus rem ducimus libero. Nam ratione veritatis odit
                dolor ipsum qui aperiam eligendi! Omnis quam nulla quos incidunt voluptatum eos ratione libero, quia
                sequi est non unde perferendis sit tenetur a saepe architecto! Eius voluptatum quaerat possimus quidem
                officiis ipsam optio ducimus beatae accusamus nesciunt, incidunt ullam excepturi nostrum nam nisi ex
                hic, laudantium quasi commodi consectetur quas iste porro sint fugit! Quidem aperiam minus nihil itaque
                dolore alias iure, enim ipsa nam earum voluptatum assumenda. Alias necessitatibus repellendus sint
                minima commodi voluptates esse, possimus deleniti earum doloremque, dignissimos, quam eos. Cumque magnam
                amet blanditiis nobis sequi, dolor impedit commodi repudiandae optio error aperiam nemo vel consectetur
                doloribus repellat recusandae dolore. Sunt totam ut fugiat maxime facilis enim maiores ipsam error
                repellendus exercitationem odio aperiam voluptates quae nihil officia qui culpa impedit velit, odit,
                recusandae in nobis cumque incidunt! Rem dolorum dignissimos, aliquid odio est cupiditate ut a ex eos,
                inventore fugit sapiente similique aliquam ipsum. Deleniti delectus ex ullam porro, in mollitia
                praesentium ea voluptates, aliquam nostrum unde corporis doloribus? Dolor suscipit consectetur
                blanditiis cumque deleniti aspernatur facere eveniet obcaecati a qui repellat maiores eum consequatur et
                amet necessitatibus quos atque veritatis minus, ab iusto eaque rem. Doloribus voluptas dolore est
                aliquam, laudantium a nisi harum minima, adipisci voluptatem veritatis. Non ratione, quidem reiciendis
                repudiandae cum porro. Tenetur dolore ea magni nulla, obcaecati quaerat natus nisi et voluptate.
                Consectetur eligendi earum itaque porro! Nam dignissimos praesentium tempora minus iure iusto placeat ea
                nisi voluptate, rem illum repellendus cum dolor voluptatum quae eum atque qui, est quidem. Consequuntur
                dolor quam totam voluptatum corporis sint quisquam quos sequi, nostrum qui maxime ullam itaque quas
                doloremque illo eligendi iure aliquam odit perspiciatis ducimus saepe harum, reprehenderit id
                voluptates! Esse vitae totam assumenda, consectetur impedit illo ut necessitatibus velit culpa molestiae
                vero? Incidunt amet nam, hic ipsa corporis nisi repellat commodi adipisci. Aliquid animi dicta
                distinctio voluptate inventore odio voluptas necessitatibus iure nam eius non, error dignissimos soluta
                assumenda debitis nostrum aut amet rem alias aperiam beatae laudantium consequuntur! Laboriosam officia
                odio velit atque, ipsum ipsam incidunt assumenda inventore accusantium molestiae unde, excepturi quod
                amet sequi quam, natus maiores sint facere recusandae aspernatur laborum fugiat provident aliquam
                nesciunt! Nihil, totam? Repellat nesciunt adipisci impedit eaque, at rerum eveniet hic eos dolore eius
                cum aliquam quos porro aliquid, deserunt facere minima. Facilis, iste. Voluptatum, hic dolorum.
                Repellendus excepturi dolorum, nemo nihil eaque fuga quisquam fugiat a, animi adipisci beatae culpa,
                deserunt perspiciatis debitis corporis facilis doloribus magnam vero quae impedit. Molestiae illo nemo
                eaque officia expedita ullam? Vel, iure aspernatur in impedit atque voluptate officia natus accusantium
                harum! Voluptas, quia quibusdam. Pariatur blanditiis, labore, facilis numquam dignissimos adipisci quae
                officiis sit excepturi libero neque asperiores dolorum. Omnis natus, iste a ratione odit reprehenderit
                officia dolorem qui porro illum quasi minus odio corporis incidunt. Incidunt placeat dolorum laudantium
                perferendis aut voluptatum tempora, expedita esse aliquid iusto! Amet officia omnis deleniti quis,
                ducimus dolores ipsa. Omnis totam sed quae aperiam sint iure iste aliquid explicabo rerum amet nihil
                suscipit impedit doloremque excepturi molestiae, pariatur necessitatibus repudiandae expedita, veniam
                illo sit. Saepe non quis enim quae neque, eveniet, labore officia quaerat distinctio laborum quasi, vero
                animi quia reiciendis ducimus! Ratione, cum unde facilis suscipit repellat error necessitatibus quod
                dolores alias amet corrupti velit accusamus voluptates quo vitae autem numquam dolorum beatae est labore
                architecto tempore, veritatis maiores provident! Dolorum quisquam ratione doloribus placeat amet optio
                eaque tempora in impedit, asperiores maxime praesentium omnis vel at suscipit rerum?
            </p>
        </div>
    </v-main>
</v-layout>
</template>