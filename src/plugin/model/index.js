import ModelCmp from './Model'

const model = {
	install(Vue){
		const ModelContructor = Vue.extend(ModelCmp);
		const vm = new ModelContructor();
		vm.$mount(document.createElement('div'));
		document.body.appendChild(vm.$el);
		
		Vue.prototype.$showModel = ({title = '标题',content = '',btn = ['取消','确定'],success = null}) => {
			if(title === '' && content === ''){
				return
			}
			vm.visible = true
			vm.title = title
			vm.content = content
			vm.btn = btn
			
			vm.$off('model')
			vm.$on('model',result => {
				success && success(result)
			})
		}
	}
}

export default model