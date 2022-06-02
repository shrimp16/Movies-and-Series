export default class sorter {

    sort(obj, base) {

        return obj.sort((a, b) => {
            console.log(a[base]);

            if (a[base] > b[base]) {
                return 1;
            }

            if (a[base] < b[base]) {
                return -1;
            }

            return 0;

        })

    }

    sortReverse(obj, base) {
        obj = this.sort(obj, base);
        return obj.reverse();
    }
}