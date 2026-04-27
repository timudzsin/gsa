--
-- PostgreSQL database dump
--

\restrict tM9RlZFkV6SlRZjokISbxZpdBUhQ9z1BvTsEgOeYalU1yG7CZch0fFoiTTjz5f8

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-27 19:43:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5169 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 35472)
-- Name: cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 35483)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 35644)
-- Name: checklist_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checklist_items (
    id bigint NOT NULL,
    checklist_id bigint NOT NULL,
    task_id bigint NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    description character varying(255) NOT NULL,
    "when" character varying(255) DEFAULT 'today'::character varying NOT NULL,
    times_this_week integer,
    rank integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT checklist_items_when_check CHECK ((("when")::text = ANY ((ARRAY['today'::character varying, 'this_week'::character varying])::text[])))
);


ALTER TABLE public.checklist_items OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 35643)
-- Name: checklist_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.checklist_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.checklist_items_id_seq OWNER TO postgres;

--
-- TOC entry 5170 (class 0 OID 0)
-- Dependencies: 242
-- Name: checklist_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.checklist_items_id_seq OWNED BY public.checklist_items.id;


--
-- TOC entry 241 (class 1259 OID 35629)
-- Name: checklists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checklists (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    date date NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.checklists OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 35628)
-- Name: checklists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.checklists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.checklists_id_seq OWNER TO postgres;

--
-- TOC entry 5171 (class 0 OID 0)
-- Dependencies: 240
-- Name: checklists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.checklists_id_seq OWNED BY public.checklists.id;


--
-- TOC entry 231 (class 1259 OID 35525)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 35524)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5172 (class 0 OID 0)
-- Dependencies: 230
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 235 (class 1259 OID 35562)
-- Name: goals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.goals (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    deadline date NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    rank integer DEFAULT 100 NOT NULL,
    color character varying(255) DEFAULT 'GRAY'::character varying NOT NULL,
    icon_url character varying(255) DEFAULT 'target.svg'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.goals OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 35561)
-- Name: goals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.goals_id_seq OWNER TO postgres;

--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 234
-- Name: goals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.goals_id_seq OWNED BY public.goals.id;


--
-- TOC entry 229 (class 1259 OID 35510)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 35495)
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 35494)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 227
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 220 (class 1259 OID 35426)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 35425)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 237 (class 1259 OID 35588)
-- Name: motivations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.motivations (
    id bigint NOT NULL,
    goal_id bigint NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.motivations OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 35587)
-- Name: motivations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.motivations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.motivations_id_seq OWNER TO postgres;

--
-- TOC entry 5176 (class 0 OID 0)
-- Dependencies: 236
-- Name: motivations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.motivations_id_seq OWNED BY public.motivations.id;


--
-- TOC entry 223 (class 1259 OID 35451)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 35544)
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name text NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 35543)
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 232
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- TOC entry 224 (class 1259 OID 35460)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 35603)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    goal_id bigint,
    user_id bigint NOT NULL,
    description character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    rank integer DEFAULT 100 NOT NULL,
    is_on_monday boolean,
    is_on_tuesday boolean,
    is_on_wednesday boolean,
    is_on_thursday boolean,
    is_on_friday boolean,
    is_on_saturday boolean,
    is_on_sunday boolean,
    times_per_week integer,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT tasks_type_check CHECK (((type)::text = ANY ((ARRAY['daily'::character varying, 'on_certain_days_of_the_week'::character varying, 'x_times_per_week'::character varying])::text[])))
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 35602)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 238
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 222 (class 1259 OID 35436)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    dont_want_essay text,
    want_essay text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 35435)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4937 (class 2604 OID 35647)
-- Name: checklist_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items ALTER COLUMN id SET DEFAULT nextval('public.checklist_items_id_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 35632)
-- Name: checklists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklists ALTER COLUMN id SET DEFAULT nextval('public.checklists_id_seq'::regclass);


--
-- TOC entry 4925 (class 2604 OID 35528)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 4928 (class 2604 OID 35565)
-- Name: goals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goals ALTER COLUMN id SET DEFAULT nextval('public.goals_id_seq'::regclass);


--
-- TOC entry 4924 (class 2604 OID 35498)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 35429)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4933 (class 2604 OID 35591)
-- Name: motivations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motivations ALTER COLUMN id SET DEFAULT nextval('public.motivations_id_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 35547)
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 35606)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 4922 (class 2604 OID 35439)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5145 (class 0 OID 35472)
-- Dependencies: 225
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- TOC entry 5146 (class 0 OID 35483)
-- Dependencies: 226
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 5163 (class 0 OID 35644)
-- Dependencies: 243
-- Data for Name: checklist_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checklist_items (id, checklist_id, task_id, is_completed, description, "when", times_this_week, rank, created_at, updated_at) FROM stdin;
1	1	6	f	Heti költések áttekintése	this_week	1	100	2026-04-27 12:27:01	2026-04-27 12:27:01
2	1	7	f	Edzés megtartása	today	\N	100	2026-04-27 12:27:01	2026-04-27 12:27:01
3	1	8	f	Új ügyfelek megkeresése	this_week	3	100	2026-04-27 12:27:01	2026-04-27 12:27:01
4	1	9	f	30 perc olvasás	today	\N	100	2026-04-27 12:27:01	2026-04-27 12:27:01
5	1	10	f	Kalóriák nyomon követése	today	\N	100	2026-04-27 12:27:01	2026-04-27 12:27:01
6	1	11	f	Mérlegelés és testösszetétel figyelése	this_week	2	100	2026-04-27 12:27:01	2026-04-27 12:27:01
7	1	12	f	5 új kapcsolat felvétele	this_week	3	100	2026-04-27 12:27:01	2026-04-27 12:27:01
8	1	14	f	Futóedzés	today	\N	100	2026-04-27 12:27:01	2026-04-27 12:27:01
9	1	15	f	Hosszú futás	this_week	1	100	2026-04-27 12:27:01	2026-04-27 12:27:01
10	1	21	f	Napi tervezés	today	\N	100	2026-04-27 12:27:01	2026-04-27 12:27:01
11	1	22	f	Rendrakás az íróasztalon	this_week	1	100	2026-04-27 12:27:01	2026-04-27 12:27:01
12	1	23	f	25 perc Takarítás	this_week	3	100	2026-04-27 12:27:01	2026-04-27 12:27:01
13	1	24	t	Gyógyszert bevenni	today	\N	100	2026-04-27 12:27:01	2026-04-27 16:39:09
\.


--
-- TOC entry 5161 (class 0 OID 35629)
-- Dependencies: 241
-- Data for Name: checklists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checklists (id, user_id, date, created_at, updated_at) FROM stdin;
1	2	2026-04-27	2026-04-27 12:27:01	2026-04-27 12:27:01
\.


--
-- TOC entry 5151 (class 0 OID 35525)
-- Dependencies: 231
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 5155 (class 0 OID 35562)
-- Dependencies: 235
-- Data for Name: goals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.goals (id, user_id, title, deadline, is_completed, rank, color, icon_url, created_at, updated_at) FROM stdin;
1	1	2 hónapon át heti 3 futás	2026-06-15	f	100	LIGHT-BLUE	directions_run_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
2	1	C1 angol nyelvvizsga	2026-08-26	f	100	BLUE	brand_family_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
3	1	2 hónapon át napi 30 perc olvasás	2026-06-15	f	100	GREEN	book_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
4	1	B2 angol nyelvvizsga	2026-01-25	t	21	YELLOW	brand_family_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
5	2	5 millió Ft megtakarítás	2026-12-31	f	100	GREEN	payments_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
6	2	Heti 7 edzés 6 hónapon át	2026-10-01	f	100	RED	fitness_center_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
7	2	Saját vállalkozás bevételének megduplázása	2026-12-31	f	100	GREEN	paid_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
8	2	2 könyv elolvasása önfejlesztés témában, és még 3 könyv elolvasása önfejlesztés témában, és még 4 könyv elolvasása önfejlesztés témában	2026-11-30	f	100	PURPLE	book_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
9	2	Testzsír százalék 15% alá csökkentése	2026-09-15	f	100	BEIGE	body_fat_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
10	2	LinkedIn hálózat bővítése 500 új kapcsolattal	2026-08-31	f	100	BLUE	diversity_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
11	2	Maraton lefutása	2026-10-10	f	100	CORAL	directions_run_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
12	2	Napi 10 000 lépés 3 hónapon keresztül	2025-12-31	t	80	GREEN	directions_walk_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-12-31 14:30:00
13	2	3 hónapos vésztartalék felépítése	2025-11-30	t	90	BLUE	payments_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-11-08 09:15:00
14	2	Alap weboldal elkészítése a vállalkozáshoz	2026-02-15	t	85	CORAL	public_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2026-01-28 16:45:00
15	2	Első félmaraton teljesítése	2025-09-20	t	78	CORAL	directions_run_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-09-05 08:20:00
16	2	100 ügyfél megszerzése a vállalkozásban	2025-10-31	t	92	INDIGO	group_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-10-12 13:10:00
17	2	30 napos cukormentes kihívás teljesítése	2025-08-15	t	74	ORANGE	blur_on_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-08-01 18:00:00
18	2	Angol nyelvvizsga B2 szint megszerzése	2025-06-30	t	88	BLUE	public_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-06-10 11:45:00
19	2	Otthoni iroda teljes berendezése	2025-07-25	t	81	SAGE	potted_plant_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-07-03 15:30:00
20	2	50 blogcikk publikálása szakmai témában	2025-12-10	t	87	PURPLE	description_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-11-21 09:00:00
21	2	Új laptop vásárlása vállalkozási célra	2025-05-31	t	76	GRAY	memory_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-05-20 17:40:00
22	2	Reggeli rutin kialakítása 60 napon át	2025-09-30	t	83	YELLOW	routine_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg	2026-04-27 12:26:53	2025-09-09 06:50:00
23	3	A piros cél címe	2027-05-14	f	100	RED	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
24	3	A coral cél címe	2026-11-22	f	100	CORAL	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
25	3	A narancssárga cél címe	2028-02-03	f	100	ORANGE	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
26	3	A citromsárga cél címe	2027-08-19	f	100	YELLOW	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
27	3	A zöld cél címe	2028-01-27	f	100	GREEN	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
28	3	A cián cél címe	2027-03-06	f	100	CYAN	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
29	3	A világoskék cél címe	2026-10-15	f	100	LIGHT-BLUE	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
30	3	A kék cél címe	2027-06-30	f	100	BLUE	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
31	4	Az indigo cél címe	2028-03-12	f	100	INDIGO	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
32	4	A lila cél címe	2026-09-28	f	100	PURPLE	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
33	4	A magenta cél címe	2027-11-05	f	100	MAGENTA	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
34	4	A rózsaszín cél címe	2028-06-17	f	100	PINK	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
35	4	A szürke cél címe	2026-08-21	f	100	GRAY	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
36	4	A zsályazöld cél címe	2027-01-13	f	100	SAGE	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
37	4	A bézs cél címe	2027-01-13	f	100	BEIGE	target.svg	2026-04-27 12:26:53	2026-04-27 12:26:53
\.


--
-- TOC entry 5149 (class 0 OID 35510)
-- Dependencies: 229
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 5148 (class 0 OID 35495)
-- Dependencies: 228
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- TOC entry 5140 (class 0 OID 35426)
-- Dependencies: 220
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2026_03_14_163554_create_personal_access_tokens_table	1
5	2026_03_14_170514_create_goals_table	1
6	2026_03_14_221650_create_motivations_table	1
7	2026_03_14_222459_create_tasks_table	1
8	2026_03_15_071759_create_checklists_table	1
9	2026_03_15_072543_create_checklist_items_table	1
\.


--
-- TOC entry 5157 (class 0 OID 35588)
-- Dependencies: 237
-- Data for Name: motivations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.motivations (id, goal_id, description, created_at, updated_at) FROM stdin;
1	1	Hogy egészségesebb legyek.	2026-04-27 12:26:53	2026-04-27 12:26:53
2	1	Hogy fittebb legyek.	2026-04-27 12:26:53	2026-04-27 12:26:53
3	2	Hogy magabiztosan kommunikálhassak külföldiekkel.	2026-04-27 12:26:53	2026-04-27 12:26:53
4	2	Hogy jobban megértsem az angol nyelvű tartalmakat.	2026-04-27 12:26:53	2026-04-27 12:26:53
5	2	Hogy jobb munkalehetőségeim legyenek.	2026-04-27 12:26:53	2026-04-27 12:26:53
6	2	Hogy külföldön is tudjak tanulni vagy dolgozni.	2026-04-27 12:26:53	2026-04-27 12:26:53
7	3	Hogy jobb formába kerüljek.	2026-04-27 12:26:53	2026-04-27 12:26:53
8	3	Hogy egészségesebb legyek.	2026-04-27 12:26:53	2026-04-27 12:26:53
9	4	Hogy megértsem az angol nyelvű tartalmakat.	2026-04-27 12:26:53	2026-04-27 12:26:53
10	5	Hogy pénzügyi biztonságban érezzem magam.	2026-04-27 12:26:53	2026-04-27 12:26:53
11	5	Hogy legyen tartalékom váratlan helyzetekre.	2026-04-27 12:26:53	2026-04-27 12:26:53
12	6	Hogy fegyelmezettebb legyek.	2026-04-27 12:26:53	2026-04-27 12:26:53
13	6	Hogy javuljon az állóképességem.	2026-04-27 12:26:53	2026-04-27 12:26:53
14	6	Hogy erősebbnek érezzem magam testileg és mentálisan.	2026-04-27 12:26:53	2026-04-27 12:26:53
15	6	Hogy fittebb legyek.	2026-04-27 12:26:53	2026-04-27 12:26:53
16	7	Hogy stabilabb üzletet építsek.	2026-04-27 12:26:53	2026-04-27 12:26:53
17	7	Hogy több szabadságom legyen anyagilag.	2026-04-27 12:26:53	2026-04-27 12:26:53
18	8	Hogy új nézőpontokat ismerjek meg.	2026-04-27 12:26:53	2026-04-27 12:26:53
19	8	Hogy jobb döntéseket hozzak az életben.	2026-04-27 12:26:53	2026-04-27 12:26:53
20	9	Hogy egészségesebb legyek.	2026-04-27 12:26:53	2026-04-27 12:26:53
21	9	Hogy jobban nézzek ki.	2026-04-27 12:26:53	2026-04-27 12:26:53
22	9	Hogy magabiztosabb legyek a testemmel kapcsolatban.	2026-04-27 12:26:53	2026-04-27 12:26:53
23	10	Hogy erősebb szakmai hálózatot építsek.	2026-04-27 12:26:53	2026-04-27 12:26:53
24	11	Hogy elmondhassam magamról, hogy lefutottam a maratont.	2026-04-27 12:26:53	2026-04-27 12:26:53
25	12	Hogy javítsam az általános egészségemet.	2026-04-27 12:26:53	2026-04-27 12:26:53
26	13	Hogy biztonságban érezzem magam anyagilag.	2026-04-27 12:26:53	2026-04-27 12:26:53
27	13	Hogy csökkentsem a pénzügyi stresszt.	2026-04-27 12:26:53	2026-04-27 12:26:53
28	14	Hogy online jelenlétem legyen.	2026-04-27 12:26:53	2026-04-27 12:26:53
29	14	Hogy több ügyfelet szerezzek.	2026-04-27 12:26:53	2026-04-27 12:26:53
\.


--
-- TOC entry 5143 (class 0 OID 35451)
-- Dependencies: 223
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- TOC entry 5153 (class 0 OID 35544)
-- Dependencies: 233
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
1	App\\Models\\User	2	api-token	fec4d323bc990da503d4d32aae5d39d9d7a9cc48338e970d998d070a277012b1	["*"]	2026-04-27 12:33:31	\N	2026-04-27 12:27:00	2026-04-27 12:33:31
2	App\\Models\\User	2	api-token	49fde9bc706f1e56d17d04834ed2f413de2ba554c5919c032850934e4cb13111	["*"]	2026-04-27 16:39:09	\N	2026-04-27 16:06:55	2026-04-27 16:39:09
\.


--
-- TOC entry 5144 (class 0 OID 35460)
-- Dependencies: 224
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
\.


--
-- TOC entry 5159 (class 0 OID 35603)
-- Dependencies: 239
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, goal_id, user_id, description, type, rank, is_on_monday, is_on_tuesday, is_on_wednesday, is_on_thursday, is_on_friday, is_on_saturday, is_on_sunday, times_per_week, created_at, updated_at) FROM stdin;
1	1	1	Futás	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	3	2026-04-27 12:26:53	2026-04-27 12:26:53
2	2	1	1 óra tanulás	on_certain_days_of_the_week	100	t	\N	\N	\N	t	t	t	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
3	3	1	30 perc olvasás	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
4	4	1	45 perc tanulás	on_certain_days_of_the_week	100	\N	\N	\N	\N	\N	t	t	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
5	\N	1	Fogmosás	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
6	5	2	Heti költések áttekintése	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	1	2026-04-27 12:26:53	2026-04-27 12:26:53
7	6	2	Edzés megtartása	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
8	7	2	Új ügyfelek megkeresése	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	3	2026-04-27 12:26:53	2026-04-27 12:26:53
9	8	2	30 perc olvasás	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
10	9	2	Kalóriák nyomon követése	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
11	9	2	Mérlegelés és testösszetétel figyelése	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	2	2026-04-27 12:26:53	2026-04-27 12:26:53
12	10	2	5 új kapcsolat felvétele	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	3	2026-04-27 12:26:53	2026-04-27 12:26:53
13	10	2	Üzenetek küldése potenciális kapcsolatoknak	on_certain_days_of_the_week	100	\N	t	t	t	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
14	11	2	Futóedzés	on_certain_days_of_the_week	100	t	\N	t	\N	\N	t	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
15	11	2	Hosszú futás	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	1	2026-04-27 12:26:53	2026-04-27 12:26:53
16	12	2	10 000 lépés(completed)	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
17	13	2	Heti megtakarítás félretétele(completed)	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	1	2026-04-27 12:26:53	2026-04-27 12:26:53
18	13	2	Kiadások csökkentése (nem szükséges vásárlások kerülése)(completed)	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
19	14	2	Weboldal fejlesztése(completd)	on_certain_days_of_the_week	100	t	\N	t	\N	\N	\N	t	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
20	14	2	Weboldal funkciók tesztelése és hibajavítás(completed)	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	2	2026-04-27 12:26:53	2026-04-27 12:26:53
21	\N	2	Napi tervezés	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
22	\N	2	Rendrakás az íróasztalon	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	1	2026-04-27 12:26:53	2026-04-27 12:26:53
23	\N	2	25 perc Takarítás	x_times_per_week	100	\N	\N	\N	\N	\N	\N	\N	3	2026-04-27 12:26:53	2026-04-27 12:26:53
24	\N	2	Gyógyszert bevenni	daily	100	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
\.


--
-- TOC entry 5142 (class 0 OID 35436)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, is_admin, dont_want_essay, want_essay, created_at, updated_at) FROM stdin;
1	anna	$2y$12$uPnhvcpYbImdY67Ua5lI9OgKoOWqYv7YPSMJFQxegvhL4gjg5j7Fu	f	😔🥀 NEM LESZEK ELÉG JÓ\n \n😓 Alacsony önbizalmam lesz\n- Félni fogok az emberektől.\n- Nem fogok tudni önmagam lenni.\n\n\n\n\n\n💔😢 25 ÉVESEN MÉG MINDIG NEM LESZ SENKIM\n- Találkozni fogok egy csodálatos sráccal, de nem leszek elég jó.\n\n\n\n\n\n👤🕯️ NEM LESZEK ELÉG JÓ BARÁTOKHOZ	😎 Magabiztos vagyok\n- Tudom magamról, hogy remek vagyok.\n- Teljesen önmagam tudok lenni.\n- Nem félek az emberek ítéletétől.\n\n\n\n\n\n💖💞 VAN EGY CSODÁLATOS PÁROM\n- A párommal bármit elmondhatunk egymásnak.\n- A párommal bármikor számíthatunk egymásra.\n- A párommal legjobb barátok vagyunk.\n\n\n\n\n\n🤗👫 REMEK BARÁTAIM VANNAK\n- Van 1-3 barátom, aki olyan mint egy testvér.\n- Része vagyok egy baráti körnek, ami olyan mint egy család.	2026-04-27 12:26:52	2026-04-27 12:26:52
3	first8	$2y$12$HGz0Yag63UEufTxOi4rwdOwh.ptT0h3m1ooBJ8iEp6xc68snNkfPO	f	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
4	last7	$2y$12$QCReDmBmEMIhQS2sAZdave7DVmhOzqJK0ZJ7wXWVbsCP60hOEZRHK	f	\N	\N	2026-04-27 12:26:53	2026-04-27 12:26:53
2	alexios	$2y$12$FH.Cu7bCXhOS.1FRTlZZ/uOiSE4D/swDOT6.URIp0HO3eqihfiZwG	f	🌪 Mit Nem Akarok\n\nAz élet tele van döntésekkel, és ahhoz, hogy valami igazán naggyá váljon, nemcsak azt kell tudni, mit akarok, hanem azt is, mit nem akarok. A céljaim tükrében világos, hogy bizonyos szokásokat, helyzeteket és hozzáállásokat egyszerűen el kell kerülnöm.\n\n\n\n\n💸 Nem akarok pénzügyi káoszt\n\nMivel a célom 5 millió Ft megtakarítás elérése, nem engedhetem meg magamnak, hogy felelőtlenül költsek. Nem akarok impulzusvásárlások rabja lenni, nem akarok olyan hónapokat, amikor a bankszámlám mínuszban van. A pénz a szabadságot jelenti számomra, és minden forint, amit okosan teszek félre, közelebb visz ahhoz, hogy a vállalkozásom bevételét meg tudjam duplázni. 🏦\n\n\n\n\n🏋️‍♂️ Nem akarok lustaságot\n\nA heti 7 edzés és a testzsír 15% alá csökkentése nem vicc. Nem akarok kifogásokat keresni, nem akarok elhalasztani egyetlen edzést sem. Nem akarok visszatérni a régi szokásaimhoz, amikor egyetlen kanapén töltött este sokkal vonzóbbnak tűnt, mint a céljaim. A fizikai kitartás és a rendszeresség elengedhetetlen, ha maratont is szeretnék lefutni. 🏃‍♂️💪\n\n\n\n\n📚 Nem akarok tudás hiányában élni\n\nA 10 önfejlesztő könyv elolvasása azt jelenti, hogy nem akarok tudás nélkül haladni. Nem akarok megmaradni a komfortzónámban, nem akarok elutasítani új nézőpontokat vagy lemaradni a fejlődésben. A könyvek a stratégia, az inspiráció és a bölcsesség forrásai, amik hozzásegítenek a vállalkozásom növekedéséhez. 📖✨\n\n\n\n\n🏢 Nem akarok szakmai elszigeteltséget\n\nA LinkedIn hálózatom bővítése 500 új kapcsolattal azt jelenti, hogy nem akarok bezárkózni. Nem akarok kimaradni lehetőségekből, nem akarok lemaradni azokról az inspiráló emberekről, akik hozzáadhatnak az életemhez vagy az üzletemhez. A kapcsolatok az egyik legerősebb tőke, amit fejleszteni kell. 🌐🤝\n\n\n\n\n⏳ Nem akarok időpazarlást\n\nMinden perc számít. Nem akarok napokat vesztegetni halogatással vagy céltalan tevékenységekkel. Nem akarok olyan életet élni, ahol a legfontosabb dolgokra nincs időm. A napi 10 000 lépés már megtanított arra, hogy a rendszeresség és az apró szokások nagy változást hoznak. ⏱️🚶‍♂️\n\n\n\n\n🔥 Nem akarok kompromisszumot a céljaimmal\n\nVállalkozás, pénzügyek, egészség, tudás – ezek mind fontosak. Nem akarok kompromisszumot kötni a céljaimmal, nem akarok beérni kevesebbel, mint amire képes vagyok. Nem akarok félúton megállni. Ha valamit el akarok érni, azt teljes szívvel, teljes energiával kell csinálnom. 🚀	🌟 Mit Akarok\n\nAz élet értelme nem csak abban rejlik, hogy elkerüljük a problémákat, hanem abban is, hogy tisztán lássuk, mit akarunk elérni. A céljaim világos irányt adnak, és minden döntésem, minden napom ehhez kapcsolódik.\n\n\n\n\n💰 Anyagi biztonság és növekedés\n\nAz elsődleges célom 5 millió Ft megtakarítás felhalmozása. Ez nem csak szám, hanem szabadság és lehetőség is. A megtakarítás lehetővé teszi, hogy nyugodtan és magabiztosan építsem a saját vállalkozásomat, és a bevételeit megduplázhassam. Tudom, hogy a pénzügyi tudatosság, a rendszeres megtakarítás és az okos döntések elengedhetetlenek ehhez a sikerhez. 🏦💹\n\n\n\n\n🏋️‍♂️ Testi erő és kitartás\n\nA céljaim között szerepel a heti 7 edzés, a testzsír 15% alá csökkentése és egy maraton lefutása. Azt akarom, hogy a testem erős, egészséges és állóképessége maximális legyen. A fizikai erő növelése nem csak külső megjelenésről szól, hanem arról is, hogy a céljaim eléréséhez szükséges energiát és kitartást megadja. 💪🏃‍♂️\n\n\n\n\n📚 Tudás és önfejlesztés\n\nA 10 önfejlesztő könyv elolvasása azt jelenti, hogy azt akarom, hogy az elmém folyamatosan fejlődjön. A tudás a stratégiához, a kreativitáshoz és a személyes fejlődéshez szükséges. Azt akarom, hogy minden nap tanuljak valami újat, hogy jobb döntéseket hozzak, és folyamatosan inspirációt szerezzek. 📖✨\n\n\n\n\n🌐 Kapcsolatok és hálózatépítés\n\n500 új LinkedIn kapcsolat azt jelenti, hogy azt akarom, hogy a szakmai hálózatom erős és támogató legyen. A kapcsolatépítés lehetőségeket teremt, új ötleteket hoz, és segít abban, hogy a vállalkozásom növekedjen. Azt akarom, hogy körülöttem olyan emberek legyenek, akik inspirálnak és motiválnak a további fejlődésre. 🤝🌍\n\n\n\n\n⏱️ Rendszeresség és következetesség\n\nA napi 10 000 lépés és a rendszeres edzés mind azt szolgálja, hogy a következetességet és a kitartást beépítsem az életembe. Azt akarom, hogy minden apró lépés számítson, hogy minden nap közelebb vigyen a céljaimhoz. A kis, folyamatos erőfeszítések összeadódnak, és hosszú távon hatalmas eredményeket hoznak. 🚶‍♂️🔥\n\n\n\n\n🚀 Vállalkozói növekedés és kreativitás\n\nA vállalkozásom bevételének megduplázása és az alap weboldal létrehozása azt jelenti, hogy azt akarom, hogy a kreativitásom és az üzleti képességeim a lehető legmagasabb szintre emelkedjenek. Azt akarom, hogy a munkám értéket teremtsen, és lehetőségeket nyisson mások számára is. 💻📈	2026-04-27 12:26:52	2026-04-27 12:33:31
\.


--
-- TOC entry 5180 (class 0 OID 0)
-- Dependencies: 242
-- Name: checklist_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.checklist_items_id_seq', 13, true);


--
-- TOC entry 5181 (class 0 OID 0)
-- Dependencies: 240
-- Name: checklists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.checklists_id_seq', 1, true);


--
-- TOC entry 5182 (class 0 OID 0)
-- Dependencies: 230
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 5183 (class 0 OID 0)
-- Dependencies: 234
-- Name: goals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.goals_id_seq', 37, true);


--
-- TOC entry 5184 (class 0 OID 0)
-- Dependencies: 227
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 5185 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);


--
-- TOC entry 5186 (class 0 OID 0)
-- Dependencies: 236
-- Name: motivations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.motivations_id_seq', 29, true);


--
-- TOC entry 5187 (class 0 OID 0)
-- Dependencies: 232
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 2, true);


--
-- TOC entry 5188 (class 0 OID 0)
-- Dependencies: 238
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 24, true);


--
-- TOC entry 5189 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4959 (class 2606 OID 35492)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 4956 (class 2606 OID 35481)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 4984 (class 2606 OID 35661)
-- Name: checklist_items checklist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4982 (class 2606 OID 35637)
-- Name: checklists checklists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT checklists_pkey PRIMARY KEY (id);


--
-- TOC entry 4966 (class 2606 OID 35540)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 35542)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 4976 (class 2606 OID 35581)
-- Name: goals goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);


--
-- TOC entry 4964 (class 2606 OID 35523)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 4961 (class 2606 OID 35508)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4943 (class 2606 OID 35434)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4978 (class 2606 OID 35596)
-- Name: motivations motivations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motivations
    ADD CONSTRAINT motivations_pkey PRIMARY KEY (id);


--
-- TOC entry 4949 (class 2606 OID 35459)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 4971 (class 2606 OID 35556)
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4973 (class 2606 OID 35559)
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- TOC entry 4952 (class 2606 OID 35469)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4980 (class 2606 OID 35617)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4945 (class 2606 OID 35450)
-- Name: users users_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_unique UNIQUE (name);


--
-- TOC entry 4947 (class 2606 OID 35448)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4954 (class 1259 OID 35482)
-- Name: cache_expiration_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cache_expiration_index ON public.cache USING btree (expiration);


--
-- TOC entry 4957 (class 1259 OID 35493)
-- Name: cache_locks_expiration_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cache_locks_expiration_index ON public.cache_locks USING btree (expiration);


--
-- TOC entry 4962 (class 1259 OID 35509)
-- Name: jobs_queue_reserved_at_available_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jobs_queue_reserved_at_available_at_index ON public.jobs USING btree (queue, reserved_at, available_at);


--
-- TOC entry 4969 (class 1259 OID 35560)
-- Name: personal_access_tokens_expires_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX personal_access_tokens_expires_at_index ON public.personal_access_tokens USING btree (expires_at);


--
-- TOC entry 4974 (class 1259 OID 35557)
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- TOC entry 4950 (class 1259 OID 35471)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 4953 (class 1259 OID 35470)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- TOC entry 4990 (class 2606 OID 35662)
-- Name: checklist_items checklist_items_checklist_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_checklist_id_foreign FOREIGN KEY (checklist_id) REFERENCES public.checklists(id) ON DELETE CASCADE;


--
-- TOC entry 4991 (class 2606 OID 35667)
-- Name: checklist_items checklist_items_task_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_task_id_foreign FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE CASCADE;


--
-- TOC entry 4989 (class 2606 OID 35638)
-- Name: checklists checklists_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT checklists_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4985 (class 2606 OID 35582)
-- Name: goals goals_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4986 (class 2606 OID 35597)
-- Name: motivations motivations_goal_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motivations
    ADD CONSTRAINT motivations_goal_id_foreign FOREIGN KEY (goal_id) REFERENCES public.goals(id) ON DELETE CASCADE;


--
-- TOC entry 4987 (class 2606 OID 35618)
-- Name: tasks tasks_goal_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_goal_id_foreign FOREIGN KEY (goal_id) REFERENCES public.goals(id) ON DELETE CASCADE;


--
-- TOC entry 4988 (class 2606 OID 35623)
-- Name: tasks tasks_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-04-27 19:43:37

--
-- PostgreSQL database dump complete
--

\unrestrict tM9RlZFkV6SlRZjokISbxZpdBUhQ9z1BvTsEgOeYalU1yG7CZch0fFoiTTjz5f8

