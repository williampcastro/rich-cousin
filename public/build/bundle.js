
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.21.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/app/components/header/Header.svelte generated by Svelte v3.21.0 */

    const file = "src/app/components/header/Header.svelte";

    function create_fragment(ctx) {
    	let header;
    	let div2;
    	let div0;
    	let t1;
    	let div1;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "rich cousin";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "challenge";
    			attr_dev(div0, "class", "text-5xl md:text-10xl uppercase");
    			add_location(div0, file, 2, 8, 208);
    			attr_dev(div1, "class", "text-sm md:text-3xl lowercase");
    			add_location(div1, file, 3, 8, 279);
    			attr_dev(div2, "class", "flex flex-row items-baseline font-Righteous text-rc-v2-orange");
    			add_location(div2, file, 1, 4, 124);
    			attr_dev(header, "class", " -m-2 flex justify-center items-center w-screen h-header md:h-2header bg-rc-v2-blue-dark shadow-bottom");
    			add_location(header, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Header", $$slots, []);
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/app/components/imageBox/ImageBox.svelte generated by Svelte v3.21.0 */

    const file$1 = "src/app/components/imageBox/ImageBox.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (9:4) {#each imageNames as imageName}
    function create_each_block(ctx) {
    	let div1;
    	let div0;
    	let t;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			attr_dev(div0, "class", "hover:shadow-2xl h-full");
    			set_style(div0, "background-image", "url(" + /*basePath*/ ctx[1] + /*imageName*/ ctx[5] + /*typeImage*/ ctx[0] + ")");
    			set_style(div0, "background-size", "cover");
    			add_location(div0, file$1, 10, 12, 403);
    			attr_dev(div1, "class", "m-4 justify-self-center shadow-bottom h-026 w-018");
    			add_location(div1, file$1, 9, 8, 327);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*typeImage*/ 1) {
    				set_style(div0, "background-image", "url(" + /*basePath*/ ctx[1] + /*imageName*/ ctx[5] + /*typeImage*/ ctx[0] + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(9:4) {#each imageNames as imageName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let each_value = /*imageNames*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8");
    			add_location(div, file$1, 7, 0, 196);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*basePath, imageNames, typeImage*/ 7) {
    				each_value = /*imageNames*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { path } = $$props;
    	let { typeImage } = $$props;
    	let { totalImages } = $$props;
    	let basePath = "./images/" + path + "/";
    	let imageNames = [...Array(totalImages).keys()];
    	const writable_props = ["path", "typeImage", "totalImages"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ImageBox> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ImageBox", $$slots, []);

    	$$self.$set = $$props => {
    		if ("path" in $$props) $$invalidate(3, path = $$props.path);
    		if ("typeImage" in $$props) $$invalidate(0, typeImage = $$props.typeImage);
    		if ("totalImages" in $$props) $$invalidate(4, totalImages = $$props.totalImages);
    	};

    	$$self.$capture_state = () => ({
    		path,
    		typeImage,
    		totalImages,
    		basePath,
    		imageNames
    	});

    	$$self.$inject_state = $$props => {
    		if ("path" in $$props) $$invalidate(3, path = $$props.path);
    		if ("typeImage" in $$props) $$invalidate(0, typeImage = $$props.typeImage);
    		if ("totalImages" in $$props) $$invalidate(4, totalImages = $$props.totalImages);
    		if ("basePath" in $$props) $$invalidate(1, basePath = $$props.basePath);
    		if ("imageNames" in $$props) $$invalidate(2, imageNames = $$props.imageNames);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [typeImage, basePath, imageNames, path, totalImages];
    }

    class ImageBox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { path: 3, typeImage: 0, totalImages: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ImageBox",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*path*/ ctx[3] === undefined && !("path" in props)) {
    			console.warn("<ImageBox> was created without expected prop 'path'");
    		}

    		if (/*typeImage*/ ctx[0] === undefined && !("typeImage" in props)) {
    			console.warn("<ImageBox> was created without expected prop 'typeImage'");
    		}

    		if (/*totalImages*/ ctx[4] === undefined && !("totalImages" in props)) {
    			console.warn("<ImageBox> was created without expected prop 'totalImages'");
    		}
    	}

    	get path() {
    		throw new Error("<ImageBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<ImageBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get typeImage() {
    		throw new Error("<ImageBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set typeImage(value) {
    		throw new Error("<ImageBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get totalImages() {
    		throw new Error("<ImageBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set totalImages(value) {
    		throw new Error("<ImageBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/app/components/titleChallange/titleChallenge.svelte generated by Svelte v3.21.0 */

    const file$2 = "src/app/components/titleChallange/titleChallenge.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let t;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(div0, "class", "text-2xl md:text-4xl uppercase");
    			add_location(div0, file$2, 5, 4, 147);
    			attr_dev(div1, "class", "flex flex-row items-center justify-center font-Righteous text-rc-v2-orange w-full mt-8");
    			add_location(div1, file$2, 4, 0, 42);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { title } = $$props;
    	const writable_props = ["title"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TitleChallenge> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TitleChallenge", $$slots, []);

    	$$self.$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ title });

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title];
    }

    class TitleChallenge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleChallenge",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
    			console.warn("<TitleChallenge> was created without expected prop 'title'");
    		}
    	}

    	get title() {
    		throw new Error("<TitleChallenge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<TitleChallenge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var version="2.0.0";

    const developers = [
        {
            name: "Dudu",
            linkedin: "https://www.linkedin.com/in/eduardo-rotundaro/",
            github: "https://github.com/EduardoRotundaro",
        },
        {
            name: "Will",
            linkedin: "https://www.linkedin.com/in/william-pinheiro-castro/",
            github: "https://github.com/williampcastro",
        }
    ];

    /* src/app/components/footer/Footer.svelte generated by Svelte v3.21.0 */
    const file$3 = "src/app/components/footer/Footer.svelte";

    function create_fragment$3(ctx) {
    	let footer;
    	let div2;
    	let div0;
    	let t0;
    	let a0;
    	let t2;
    	let div1;
    	let t3;
    	let a1;
    	let t4;
    	let t5_value = developers[0].name + "";
    	let t5;
    	let a1_href_value;
    	let t6;
    	let a2;
    	let t7;
    	let t8_value = developers[1].name + "";
    	let t8;
    	let a2_href_value;
    	let t9;
    	let t10;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text("Powered By ");
    			a0 = element("a");
    			a0.textContent = "@Primo Rico";
    			t2 = space();
    			div1 = element("div");
    			t3 = text("Developed By\n            ");
    			a1 = element("a");
    			t4 = text("@");
    			t5 = text(t5_value);
    			t6 = text("\n            And\n            ");
    			a2 = element("a");
    			t7 = text("@");
    			t8 = text(t8_value);
    			t9 = text("\n            - v");
    			t10 = text(/*versionApp*/ ctx[0]);
    			attr_dev(a0, "class", "px-2");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://www.instagram.com/oprimo.rico/");
    			add_location(a0, file$3, 8, 24, 378);
    			add_location(div0, file$3, 8, 8, 362);
    			attr_dev(a1, "class", "px-2");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", a1_href_value = developers[0].github);
    			add_location(a1, file$3, 11, 12, 531);
    			attr_dev(a2, "class", "px-2");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", a2_href_value = developers[1].github);
    			add_location(a2, file$3, 13, 12, 649);
    			add_location(div1, file$3, 9, 8, 488);
    			attr_dev(div2, "class", "flex flex-col justify-center items-center");
    			add_location(div2, file$3, 7, 4, 298);
    			attr_dev(footer, "class", "-m-2 inset-x-0 bottom-0 flex justify-center items-center h-12 bg-rc-v2-blue-dark font-Righteous  text-rc-v2-orange");
    			add_location(footer, file$3, 6, 0, 162);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div0, a0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, t3);
    			append_dev(div1, a1);
    			append_dev(a1, t4);
    			append_dev(a1, t5);
    			append_dev(div1, t6);
    			append_dev(div1, a2);
    			append_dev(a2, t7);
    			append_dev(a2, t8);
    			append_dev(div1, t9);
    			append_dev(div1, t10);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let versionApp = version;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Footer", $$slots, []);
    	$$self.$capture_state = () => ({ version, developers, versionApp });

    	$$self.$inject_state = $$props => {
    		if ("versionApp" in $$props) $$invalidate(0, versionApp = $$props.versionApp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [versionApp];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/app/views/Home.svelte generated by Svelte v3.21.0 */
    const file$4 = "src/app/views/Home.svelte";

    function create_fragment$4(ctx) {
    	let t0;
    	let div;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let current;
    	const header = new Header({ $$inline: true });

    	const titlechallenge0 = new TitleChallenge({
    			props: { title: "Challenge - Rei Salomão" },
    			$$inline: true
    		});

    	const imagebox0 = new ImageBox({
    			props: {
    				path: "images_challenge_salomao",
    				typeImage: ".jpeg",
    				totalImages: 9
    			},
    			$$inline: true
    		});

    	const titlechallenge1 = new TitleChallenge({
    			props: { title: "Challenge - A Arca" },
    			$$inline: true
    		});

    	const imagebox1 = new ImageBox({
    			props: {
    				path: "images_challenge_arca",
    				typeImage: ".PNG",
    				totalImages: 5
    			},
    			$$inline: true
    		});

    	const titlechallenge2 = new TitleChallenge({
    			props: { title: "Challenge - VII" },
    			$$inline: true
    		});

    	const imagebox2 = new ImageBox({
    			props: {
    				path: "images_challenge_VII",
    				typeImage: ".jpeg",
    				totalImages: 24
    			},
    			$$inline: true
    		});

    	const titlechallenge3 = new TitleChallenge({
    			props: { title: "Challenge - VI" },
    			$$inline: true
    		});

    	const imagebox3 = new ImageBox({
    			props: {
    				path: "images_challenge_VI",
    				typeImage: ".jpg",
    				totalImages: 21
    			},
    			$$inline: true
    		});

    	const footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			div = element("div");
    			create_component(titlechallenge0.$$.fragment);
    			t1 = space();
    			create_component(imagebox0.$$.fragment);
    			t2 = space();
    			create_component(titlechallenge1.$$.fragment);
    			t3 = space();
    			create_component(imagebox1.$$.fragment);
    			t4 = space();
    			create_component(titlechallenge2.$$.fragment);
    			t5 = space();
    			create_component(imagebox2.$$.fragment);
    			t6 = space();
    			create_component(titlechallenge3.$$.fragment);
    			t7 = space();
    			create_component(imagebox3.$$.fragment);
    			t8 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div, "class", "md:max-w-screen-lg max-w-screen-md contents");
    			add_location(div, file$4, 8, 0, 304);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(titlechallenge0, div, null);
    			append_dev(div, t1);
    			mount_component(imagebox0, div, null);
    			append_dev(div, t2);
    			mount_component(titlechallenge1, div, null);
    			append_dev(div, t3);
    			mount_component(imagebox1, div, null);
    			append_dev(div, t4);
    			mount_component(titlechallenge2, div, null);
    			append_dev(div, t5);
    			mount_component(imagebox2, div, null);
    			append_dev(div, t6);
    			mount_component(titlechallenge3, div, null);
    			append_dev(div, t7);
    			mount_component(imagebox3, div, null);
    			insert_dev(target, t8, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(titlechallenge0.$$.fragment, local);
    			transition_in(imagebox0.$$.fragment, local);
    			transition_in(titlechallenge1.$$.fragment, local);
    			transition_in(imagebox1.$$.fragment, local);
    			transition_in(titlechallenge2.$$.fragment, local);
    			transition_in(imagebox2.$$.fragment, local);
    			transition_in(titlechallenge3.$$.fragment, local);
    			transition_in(imagebox3.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(titlechallenge0.$$.fragment, local);
    			transition_out(imagebox0.$$.fragment, local);
    			transition_out(titlechallenge1.$$.fragment, local);
    			transition_out(imagebox1.$$.fragment, local);
    			transition_out(titlechallenge2.$$.fragment, local);
    			transition_out(imagebox2.$$.fragment, local);
    			transition_out(titlechallenge3.$$.fragment, local);
    			transition_out(imagebox3.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(titlechallenge0);
    			destroy_component(imagebox0);
    			destroy_component(titlechallenge1);
    			destroy_component(imagebox1);
    			destroy_component(titlechallenge2);
    			destroy_component(imagebox2);
    			destroy_component(titlechallenge3);
    			destroy_component(imagebox3);
    			if (detaching) detach_dev(t8);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Home", $$slots, []);
    	$$self.$capture_state = () => ({ Header, ImageBox, TitleChallenge, Footer });
    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.21.0 */

    function create_fragment$5(ctx) {
    	let current;
    	const home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	$$self.$capture_state = () => ({ Home });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
