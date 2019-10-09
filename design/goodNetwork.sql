
CREATE SEQUENCE public.empresa_empresa_id_seq_1;

CREATE TABLE public.Empresa (
                Empresa_ID REAL NOT NULL DEFAULT nextval('public.empresa_empresa_id_seq_1'),
                Empresa_Nombre VARCHAR NOT NULL,
                CONSTRAINT empresa_id PRIMARY KEY (Empresa_ID)
);


ALTER SEQUENCE public.empresa_empresa_id_seq_1 OWNED BY public.Empresa.Empresa_ID;

CREATE TABLE public.Estado (
                Estado_ID INTEGER NOT NULL,
                Estado_Tipo VARCHAR NOT NULL,
                CONSTRAINT estado_pk PRIMARY KEY (Estado_ID)
);


CREATE SEQUENCE public.persona_persona_id_seq;

CREATE TABLE public.Persona (
                Persona_ID INTEGER NOT NULL DEFAULT nextval('public.persona_persona_id_seq'),
                Persona_Nombre VARCHAR NOT NULL,
                Persona_Edad INTEGER,
                Persona_Correo VARCHAR NOT NULL,
                Persona_Telefono INTEGER NOT NULL,
                Persona_Saldo INTEGER DEFAULT 0,
                Reputacion REAL DEFAULT 0.0,
                Persona_Habilidades TEXT NOT NULL,
                Persona_Descripcion VARCHAR NOT NULL,
                Empresa_ID REAL NOT NULL,
                CONSTRAINT persona_id PRIMARY KEY (Persona_ID)
);


ALTER SEQUENCE public.persona_persona_id_seq OWNED BY public.Persona.Persona_ID;

CREATE SEQUENCE public.tarea_tarea_id_seq;

CREATE TABLE public.Tarea (
                Tarea_ID INTEGER NOT NULL DEFAULT nextval('public.tarea_tarea_id_seq'),
                Tarea_Titulo VARCHAR NOT NULL,
                Tarea_Descripcion TEXT DEFAULT 'No se añadio una descripcion',
                Tarea_Creacion DATE NOT NULL,
                Tarea_Fecha_Limite DATE NOT NULL,
                Tarea_Costo INTEGER NOT NULL,
                Persona_ID INTEGER NOT NULL,
                Estado_ID INTEGER NOT NULL,
                CONSTRAINT tarea_id PRIMARY KEY (Tarea_ID)
);


ALTER SEQUENCE public.tarea_tarea_id_seq OWNED BY public.Tarea.Tarea_ID;

CREATE SEQUENCE public.tarea_aceptada_tarea_aceptada_id_seq;

CREATE TABLE public.Tarea_Aceptada (
                Tarea_Aceptada_ID INTEGER NOT NULL DEFAULT nextval('public.tarea_aceptada_tarea_aceptada_id_seq'),
                Persona_ID INTEGER NOT NULL,
                Tarea_ID INTEGER NOT NULL,
                Aceptada_Fecha DATE NOT NULL,
                CONSTRAINT tarea_aceptada_pk PRIMARY KEY (Tarea_Aceptada_ID)
);


ALTER SEQUENCE public.tarea_aceptada_tarea_aceptada_id_seq OWNED BY public.Tarea_Aceptada.Tarea_Aceptada_ID;

ALTER TABLE public.Persona ADD CONSTRAINT empresa_persona_fk
FOREIGN KEY (Empresa_ID)
REFERENCES public.Empresa (Empresa_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Tarea ADD CONSTRAINT estado_tarea_fk
FOREIGN KEY (Estado_ID)
REFERENCES public.Estado (Estado_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Tarea ADD CONSTRAINT persona_tarea_fk
FOREIGN KEY (Persona_ID)
REFERENCES public.Persona (Persona_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Tarea_Aceptada ADD CONSTRAINT persona_tarea_aceptada_fk
FOREIGN KEY (Persona_ID)
REFERENCES public.Persona (Persona_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Tarea_Aceptada ADD CONSTRAINT tarea_tarea_aceptada_fk
FOREIGN KEY (Tarea_ID)
REFERENCES public.Tarea (Tarea_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
