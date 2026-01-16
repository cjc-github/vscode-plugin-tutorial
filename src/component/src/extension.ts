import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "component" is now active!');

	const disposable = vscode.commands.registerCommand('component.helloWorld', async() => {
		
		/** 组件：消息 */
		// // 方法1：使用async await方式调用错误消息框
		// await fun0();
		// await fun1();

		// // 方法2:使用.then链式调用
		// fun2();


		/** 组件：进度条 */
		await fun4();

		/** 组件：配置 */

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


async function fun0() {
	try {
		await vscode.window.showErrorMessage('这是错误消息',
			{ modal: true, detail: '详细信息：发生了一个错误，请重试。' },
			{ title: '重试' },
			{ title: '取消' }
		).then(selection => {
			if (selection) {
				if (selection.title === '重试') {
					vscode.window.showInformationMessage('您选择了重试。');
				} else if (selection.title === '取消') {
					vscode.window.showInformationMessage('您选择了取消。');
				}
			} else {
				vscode.window.showInformationMessage('您关闭了消息框。');
			}
		});	
	} catch (error) {
		console.error(error);5
		vscode.window.showErrorMessage('显示错误消息时出错。');
	}
}

async function fun1() {
	try {
		await vscode.window.showErrorMessage('这是错误消息',
			{ title: '重试' },
			{ title: '取消' }
		).then(selection => {
			if (selection) {
				if (selection.title === '重试') {
					vscode.window.showInformationMessage('您选择了重试。');
				} else if (selection.title === '取消') {
					vscode.window.showInformationMessage('您选择了取消。');
				}
			} else {
				vscode.window.showInformationMessage('您关闭了消息框。');
			}
		});	
	} catch (error) {
		console.error(error);
		vscode.window.showErrorMessage('显示错误消息时出错。');
	}
}


function fun2() {
	vscode.window.showErrorMessage('这是错误消息',
		{ modal: true, detail: '详细信息：发生了一个错误，请重试。' },
		{ title: '重试' },
		{ title: '取消' }
	).then(selection => {
		if (selection) {
			if (selection.title === '重试') {
				vscode.window.showInformationMessage('您选择了重试。');
				fun3();
			} else if (selection.title === '取消') {
				vscode.window.showInformationMessage('您选择了取消。');
				fun3();
			}
		} else {
			vscode.window.showInformationMessage('您关闭了消息框。');
			fun3();
		}
	});	
}

function fun3() {
	try {
		vscode.window.showErrorMessage('这是错误消息',
			{ title: '重试' },
			{ title: '取消' }
		).then(selection => {
			if (selection) {
				if (selection.title === '重试') {
					vscode.window.showInformationMessage('您选择了重试。');
				} else if (selection.title === '取消') {
					vscode.window.showInformationMessage('您选择了取消。');
				}
			} else {
				vscode.window.showInformationMessage('您关闭了消息框。');
			}
		});	
	} catch (error) {
		console.error(error);
		vscode.window.showErrorMessage('显示错误消息时出错。');
	}
}

async function fun4() {
	await notification_progress_without_progressbar_and_cancel();
	await notification_progress_with_cancel();
	await notification_progress_without_cancel();
	await source_control_progress();
	await window_progress();
}

async function notification_progress_without_progressbar_and_cancel() {
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "正在执行任务...",
        cancellable: true
    }, async (progress) => {
        // 不报告具体进度增量，只显示不确定的进度动画
        progress.report({ message: "任务处理中，请稍候..." });
        
        // 模拟任务执行时间
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        vscode.window.showInformationMessage('任务完成！');
    });
}


async function notification_progress_with_cancel() {
	await vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: "正在执行任务...",
		cancellable: false
	}, async (progress) => {
		for (let i = 0; i <= 100; i += 10) {
			progress.report({ increment: 10, message: `完成 ${i}%` });
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		vscode.window.showInformationMessage('任务完成！');
	});
}

async function notification_progress_without_cancel() {
	await vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: "正在执行任务...",
		cancellable: true
	}, async (progress) => {
		for (let i = 0; i <= 100; i += 10) {
			progress.report({ increment: 10, message: `完成 ${i}%` });
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		vscode.window.showInformationMessage('任务完成！');
	});
}

async function source_control_progress() {
	await vscode.window.withProgress({
		location: vscode.ProgressLocation.SourceControl,
		title: "正在执行任务...",
		cancellable: true
	}, async (progress) => {
		for (let i = 0; i <= 100; i += 10) {
			progress.report({ increment: 10, message: `完成 ${i}%` });
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		vscode.window.showInformationMessage('任务完成！');
	});
}


async function window_progress() {
	await vscode.window.withProgress({
		location: vscode.ProgressLocation.Window,
		title: "正在执行任务...",
		cancellable: true // 支持拒绝
	}, async (progress) => {
		for (let i = 0; i <= 100; i += 10) {
			progress.report({ increment: 10, message: `完成 ${i}%` });
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		vscode.window.showInformationMessage('任务完成！');
	});
}