*To copy the database, I ran*
*If you already have database, skip to the bottom to read some more info*

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16415)
-- Name: Department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Department" (
    "DID" bigint NOT NULL,
    "Dname" text NOT NULL,
    "MgrID" bigint NOT NULL,
    "Daddress" text NOT NULL
);


ALTER TABLE public."Department" OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16394)
-- Name: Employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employee" (
    "SSN" bigint NOT NULL,
    "EName" text NOT NULL,
    "EID" bigint NOT NULL,
    "Salary" money NOT NULL,
    "Address" text NOT NULL,
    "DOB" date NOT NULL,
    "Username" text NOT NULL,
    "Password" text NOT NULL
);


ALTER TABLE public."Employee" OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16402)
-- Name: Projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Projects" (
    "PID" bigint NOT NULL,
    "Pname" text NOT NULL,
    "Plocation" text NOT NULL
);


ALTER TABLE public."Projects" OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16410)
-- Name: WorksOn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WorksOn" (
    "EID" bigint NOT NULL,
    "PID" bigint NOT NULL,
    "MgrID" bigint NOT NULL,
    "DID" bigint NOT NULL,
    "Pstart" date NOT NULL,
    "Pend" date NOT NULL
);


ALTER TABLE public."WorksOn" OWNER TO postgres;

--
-- TOC entry 2835 (class 0 OID 16415)
-- Dependencies: 199
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: postgres
--







*********************
After running that, I ran this last bit
*********************

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DID");


--
-- TOC entry 2699 (class 2606 OID 16401)
-- Name: Employee Employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("EID");


--
-- TOC entry 2701 (class 2606 OID 16409)
-- Name: Projects Projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY ("PID");


--
-- TOC entry 2703 (class 2606 OID 16414)
-- Name: WorksOn WorksOn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorksOn"
    ADD CONSTRAINT "WorksOn_pkey" PRIMARY KEY ("DID", "PID");


--
-- TOC entry 2706 (class 2606 OID 16428)
-- Name: WorksOn DID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorksOn"
    ADD CONSTRAINT "DID" FOREIGN KEY ("DID") REFERENCES public."Department"("DID");


--
-- TOC entry 2708 (class 2606 OID 16438)
-- Name: WorksOn EID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorksOn"
    ADD CONSTRAINT "EID" FOREIGN KEY ("EID") REFERENCES public."Employee"("EID");


--
-- TOC entry 2710 (class 2606 OID 16423)
-- Name: Department MgrID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "MgrID" FOREIGN KEY ("MgrID") REFERENCES public."Employee"("EID");


--
-- TOC entry 2709 (class 2606 OID 16443)
-- Name: WorksOn MgrID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorksOn"
    ADD CONSTRAINT "MgrID" FOREIGN KEY ("MgrID") REFERENCES public."Employee"("EID");


--
-- TOC entry 2707 (class 2606 OID 16433)
-- Name: WorksOn PID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorksOn"
    ADD CONSTRAINT "PID" FOREIGN KEY ("PID") REFERENCES public."Projects"("PID");


-- Completed on 2019-04-16 11:09:59

--
-- PostgreSQL database dump complete
--

**********************
to log in as admin, you have to have the EName of an employee to be equal to 1, which allows access to the admin pages to insert and view specific data

public log in just let's you view certain data, but not super private information like SSN ;)