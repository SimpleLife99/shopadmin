<template>
    <div class="commodity">
        <div class="searchArea">
            <div class="inputArea">
                <div class="inputBox">
                    <p>请选择店铺</p>
                    <el-select v-model="searchMsg.shop" filterable placeholder="请选择" @change="changeData">
                        <el-option
                                v-for="item in shopList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inputBox">
                    <el-select v-model="searchMsg.classification" placeholder="商品分类">
                        <el-option
                                v-for="item in commodityClassification"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inputBox">
                    <el-select v-model="searchMsg.classification2" placeholder="二级分类">
                        <el-option
                                v-for="item in commodityClassification2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inputBox">
                    <el-select v-model="searchMsg.category" placeholder="商品类别">
                        <el-option
                                v-for="item in category"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inputBox">
                    <p>执行的操作</p>
                    <el-select v-model="searchMsg.option" placeholder="操作">
                        <el-option
                                v-for="item in commodityOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="operationArea">
                <div class="inputBox">
                    <p>搜索关键字</p>
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="searchMsg.inputKey">
                    </el-input>
                    <el-button class="searchBtn" type="primary" icon="el-icon-search">搜索</el-button>
                </div>
                <el-button type="success" icon="el-icon-download">导出</el-button>
            </div>
        </div>
        <div class="commodityList">
            <el-table
                    v-loading="tableLoading"
                    :data="commodityList"
                    size="medium"
                    :header-cell-style="{background: '#f2f5ff'}"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column type="selection" width="50"/>

                <el-table-column align="center" label="商品图" width="100">
                    <template slot-scope="scope">
                        <el-avatar shape="square" :size="80" fit="fit" :src="scope.row.image" @error="errorHandler">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="goods_name"  label="商品名称"  min-width="130"/>
                <el-table-column align="center" prop="goods_id"  label="商品编号" min-width="120"/>
                <el-table-column align="center" prop="goods_sn"  label="商品货号" min-width="130"/>
                <el-table-column align="center" prop="shop"  label="所属门店" min-width="120"/>
                <el-table-column align="center" prop="class"  label="所属分类" />
                <el-table-column align="center" label="所属分类" min-width="150">
                    <el-tag>荐</el-tag>
                    <el-tag type="success" style="margin: 0 5px">新</el-tag>
                    <el-tag type="danger">热</el-tag>
                </el-table-column>
                <el-table-column align="center" prop="shop_price"  label="在售价格" width="100"/>
                <el-table-column align="center" prop="activity_type"  label="活动类型" />
                <el-table-column align="center" prop="activity_price"  label="活动价格" width="100"/>
                <el-table-column align="center" prop="stock"  label="商品库存" width="100"/>
                <el-table-column align="center" prop="onsale_time"  label="上架时间" width="120"/>
                <el-table-column align="center" label="操作" width="150">
                    <el-button type="primary">操作</el-button>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        @current-change="changeCurrent"
                        @prev-click="prevPage"
                        @next-click="nextPage"
                        layout="prev, pager, next"
                        :total="20">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ontheshelf",
        data() {
            return {
                tableLoading:false,         // 列表加载
                searchMsg: {
                    shop: '',
                    option: '',
                    classification: '',
                    classification2:'',
                    category:'',
                    inputKey:''
                },
                category:[
                    {value:1,label:'热销'},
                    {value:2,label:'推荐'},
                    {value:3,label:'新品'}
                ],
                shopList: [
                    {value: 1, label: '望江花园店'},
                    {value: 2, label: '书香门第店'}
                ],
                commodityOption: [
                    {value: 1, label: '热销'},
                    {value: 2, label: '推荐'}
                ],
                commodityClassification: [
                    {value: 1, label: '时令水果'},
                    {value: 2, label: '新鲜蔬菜'},
                    {value: 3, label: '肉蛋水产'}
                ],
                commodityClassification2:[],
                /*   商品数据列表   */
                commodityList:[
                    {
                        image:'http://img.zwztf.net/10000005/img/cad9a2b8-319c-48e8-a9ff-eba11dd8c8fc.jpg',
                        goods_id: '1037060',
                        goods_sn:'6971533237666',
                        goods_name:'500ml52度争牛酒（红瓶）',
                        shop:'望江花园店',
                        class:'特供商品',
                        shop_price:'20.0',
                        activity_type:'促销活动',
                        activity_price:'10.0',
                        stock:'200',
                        onsale_time:'2020-7-16'
                    },
                    {
                        image:'http://img.zwztf.net/10000005/img/cad9a2b8-',
                        good_id: '132154',
                        goods_sn:'65465612313212',
                        goods_name:'维达卫生纸',
                        shop:'望江花园店',
                        class:'特供商品',
                        shop_price:'2.0',
                        activity_type:'秒杀',
                        activity_price:'1.0',
                        stock:'500',
                        onsale_time:'2020-7-16'
                    }
                ]
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            handleSelectionChange(val){
                console.log('列表选中',val)
            },
            errorHandler() {
                return true
            },
            changeData(value){
                console.log(value)
            },
            /* 分页方法 */
            changeCurrent(val){
                console.log('当前页',val)
            },
            prevPage(val){
                console.log('上一页',val)
            },
            nextPage(val){
                console.log('下一页',val)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./../../styles/pages/commodity/ontheshelf";
</style>