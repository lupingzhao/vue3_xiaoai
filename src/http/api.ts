import { h } from "vue"
import http from "./"
import qs from 'qs'
export default {
    login({ username, password }: { username: string, password: string }) {
        return http.post('/login', {
            username,
            password
        })
    },
    // 用户管理
    permissions: {
        // 侧边栏
        Asidemenus() {
            return http.get('/menus')
        }
    },
    // 用户
    use: {
        //         query	查询参数	可以为空 搜索功能
        // pagenum	当前页码	不能为空
        // pagesize	每页显示条数	不能为空
        userslist(pagenum: number, pagesize: number, query?: string) {
            if (query) {
                return http.get(`/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
            } else {
                return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}`)
            }


        },
        // username	用户名称	不能为空
        // password	用户密码	不能为空
        // email	邮箱	可以为空
        // mobile	手机号	可以为空
        add(username: string, password: string, email: string, mobile: string) {
            return http.post('/users', {
                username,
                password,
                email,
                mobile
            })
        },
        // 查询用户信息
        userinfo(id: string) {
            return http.get(`/users/:id?id=${id}`)
        },
        //         id	用户 id	不能为空 参数是url参数:id
        // email	邮箱	可以为空
        // mobile	手机号	可以为空
        edit(id: string, email: string, mobile: string) {
            return http.put(`/users/${id}`, {

                email,
                mobile
            })
        },
        del(id: number) {
            return http.delete(`/users/${id}`)
        },
        // 修改状态
        state(uId: number, type: boolean) {
            return http.put(`/users/${uId}/state/${type}`)
        },
        // 分配角色
        allot(id: number, rid: number) {
            //             id	用户 ID	不能为空参数是url参数:id
            // rid
            return http.put(`/users/${id}/role`, {
                rid
            })
        }


    },
    // 权限
    root: {
        // 角色列表
        roles() {
            return http.get('/roles')
        },
        // 编辑
        edit(id: number, roleName: string, roleDesc: string) {
            return http.put(`/roles/${id}`, {
                roleName,
                roleDesc,
            })
        },
        // 删除角色
        delete(id: number) {

            return http.delete(`/roles/${id}`)
        },
        // 权限列表
        list(type: string) {
            // type	类型	值 list 或 tree , list 列表显示权限, tree 树状显示权限,
            return http.get(`/rights/${type}`)
        },
        // 添加角色
        add(roleName: string, roleDesc: string) {
            // roleName	角色名称	不能为空
            // roleDesc
            return http.post(`/roles`, {
                roleName,
                roleDesc
            })
        },
        // 分配权限
        deitRoot(roleId: number, rids: string) {
            // : roleId	角色 ID	不能为空携带在url中
            // rids	权限 ID 列表（
            const r = qs.stringify({ rids })
            return http.post(`roles/${roleId}/rights`, r)
        },
        //删除指定权限
        delRootid(roleId: number, rightId: number) {
            // : roleId	角色 ID	不能为空携带在url中
            // : rightId	权限 ID	不能为空携带在url中
            return http.delete(`/roles/${roleId}/rights/${rightId}`)
        }

    },
    // 商品
    good: {
        // query 可以为空
        list(pagenum: number, pagesize: number, query?: string) {
            if (query) {
                return http.get(`/goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
            } else {
                return http.get(`/goods?pagenum=${pagenum}&pagesize=${pagesize}`)
            }

        },
        // 删除商品
        delete(id: number) {
            return http.delete(`/goods/${id}`)
        },
        // 分类数据
        Catelist(type?: number, pagenum?: number, pagesize?: number) {
            // type[1, 2, 3]	值：1，2，3 分别表示显示一层二层三层分类列表
            // 【可选参数】如果不传递，则默认获取所有级别的分类
            // pagenum	当前页码值	【可选参数】如果不传递，则默认获取所有分类
            // pagesize	每页显示
            if (pagenum) {
                return http.get(`/categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
            } else {
                return http.get(`/categories?type=${type}`)
            }
        },
        // 添加分类
        addCate(cat_pid: number, cat_name: string, cat_level: number) {
            // cat_pid	分类父 ID	不能为空，如果要添加1级分类，则父分类Id应该设置为 0
            // cat_name	分类名称	不能为空
            // cat_level	分
            return http.post('/categories', {
                cat_pid, cat_name, cat_level
            })
        },
        // 删除分类
        delCate(id: number) {
            return http.delete(`/categories/${id}`)
        },
        //编辑分类
        editCate(id: number, cat_name: string) {
            return http.put(`/categories/${id}`, {
                cat_name
            })
        },
        // 参数列表
        arrtlist(id: number, sel: string) {
            // : id	分类 ID	不能为空携带在url中
            // sel[only, many]	不能为空, 通过
            return http.get(`/categories/${id}/attributes?sel=${sel}`)
        },
        // 添加属性或者参数
        addjt(id: number, attr_name: string, attr_sel: string, attr_vals: string) {
            // : id	分类 ID	不能为空携带在url中
            // attr_name	参数名称	不能为空
            // attr_sel[only, many]	不能为空
            // attr_vals 添加标签用	如果是 many 就需要填写值的选项，以逗号分隔	【可选参数】
            return http.post(`/categories/${id}/attributes`, {
                attr_name,
                attr_sel,
                attr_vals
            })
        },
        // 编辑参数
        eidts(id: number, attrId: number, attr_name: string, attr_sel: string, attr_vals: string) {
            // : id	分类 ID	不能为空携带在url中
            // : attrId	属性 ID	不能为空携带在url中
            // attr_name	新属性的名字	不能为空，携带在请求体中
            // attr_sel	属性的类型[many或only]	不能为空，携带在请求体中
            // attr_vals	参数的属性值	可选参数，携带在请求体中
            return http.put(`/categories/${id}/attributes/${attrId}`, {
                attr_name,
                attr_sel,
                attr_vals
            })
        },
        //添加/删除分类参数标签
        updateAttributesById(id: number, attrId: number, attr_name: string, attr_sel: string, attr_vals: string) {
            return http.put(`categories/${id}/attributes/${attrId}`, { attr_name, attr_sel, attr_vals })
        },
        // 添加商品
        addgoods(goods_name: string, goods_cat: string, goods_price: string, goods_number: string, goods_weight: string, goods_introduce: string, pics: any) {
            // goods_name	商品名称	不能为空
            // goods_cat	以为','分割的分类列表	不能为空
            // goods_price	价格	不能为空
            // goods_number	数量	不能为空
            // goods_weight	重量	不能为空
            // goods_introduce	介绍	可以为空
            // pics	上传的图片临时路径（对象）	可以为空

            return http.post(`/goods`, {
                goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce
            })
        }


    },
    order: {
        // query	查询参数	可以为
        list(pagenum: number, pagesize: number, query?: string) {
            if (query) {
                return http.get(`/orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
            } else {
                return http.get(`/orders?pagenum=${pagenum}&pagesize=${pagesize}`)
            }
        },
        // 物流
        logistics() {
            return http.get('/kuaidi/:id')
        }
    },
    // 数据表 echats
    tj() {
        return http.get('/reports/type/1')
    }
}