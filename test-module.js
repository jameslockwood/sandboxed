console.log('parsing pvt')

const test = async () => {
    console.log('running pvt')
    await new Promise(res => {
        setTimeout(() => {
            console.log('pvt done')
            res({ ok: true });
        }, 500);
    });
}

export default await test();