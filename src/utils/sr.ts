import ScrollReveal from 'scrollreveal';

let isSSR = false
if (typeof window === 'undefined') {
    isSSR = true
}
const sr = isSSR ? null : ScrollReveal();

export default sr;