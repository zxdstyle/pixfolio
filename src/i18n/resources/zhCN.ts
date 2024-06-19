import type { ResourceLanguage } from 'i18next'

const lang: ResourceLanguage = {
    access_key_id: '访问密钥 Id(AccessKeyId)',
    secret_access_key: '安全访问密钥(SecretAccessKey)',
    bucket: '存储桶',
    add_filename_to_disposition: 'Add filename to disposition',
    add_filename_to_disposition_tips: 'Add filename to Content-Disposition header.',
    custom_host: 'Custom host',
    endpoint: 'Endpoint',
    force_path_style: 'Force path style',
    list_object_version: 'List object version',
    list_object_versions: {
        v1: 'V1',
        v2: 'V2',
    },
    placeholder: 'Placeholder',
    region: 'Region',
    remove_bucket: 'Remove bucket',
    remove_bucket_tips: '使用自定义主机时从路径中删除bucket名称。',
    root_folder_path: 'Root folder path',
    session_token: 'Session token',
    sign_url_expire: 'Sign url expire',
    please_input: '请输入',
    notifications: {
        success: '成功',
        deleteSuccess: '删除成功',
        createSuccess: '创建成功',
    },
    common: {
        create: '添加',
        update: '编辑',
        delete: '删除',
        name: '名称',
    },
    buttons: {
        cancel: '取消',
        save: '保存',
    },
    driver: {
        name: '驱动',
    },
    storage: {
        name: '存储',
    },
}

export default lang
