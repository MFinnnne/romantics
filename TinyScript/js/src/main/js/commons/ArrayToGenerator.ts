/*
 * @Author: MFine
 * @Date: 2021-07-02 23:50:35
 * @LastEditTime: 2021-07-02 23:52:55
 * @LastEditors: MFine
 * @Description:
 */
function* arrayToGenerator<T>(arr: T[]):Iterator<T> {
	for (let index = 0; index < arr.length; index++) {
		yield arr[index]
	}
}
export default arrayToGenerator
