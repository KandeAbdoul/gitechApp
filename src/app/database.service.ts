import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: SQLiteObject;
  courses = [
    {
      id: 11,
      nom : 'Hiqtoire-Geo',
      classe: 1,
      semestre: 2,
      coef: 6,
      prof: 1
    },
    {
      id: 12,
      nom : 'Français',
      classe: 1,
      semestre: 2,
      coef: 6,
      prof: 2
    },
    {
      id: 13,
      nom : 'Anglais',
      classe: 1,
      semestre: 2,
      coef: 5,
      prof: 3
    },
    {
      id: 14,
      nom : 'Mathématique',
      classe: 1,
      semestre: 2,
      coef: 3,
      prof: 4
    },
    {
      id: 15,
      nom : 'Science-Physique',
      classe: 1,
      semestre: 2,
      coef: 2,
      prof: 5
    },
    {
      id: 16,
      nom : 'Philosophie',
      classe: 1,
      semestre: 2,
      coef: 2,
      prof: 6
    }

  ];

  currentYear = '2017 - 2018';
  currentSemestre = '1er Trimestre';
  semestre = {
    idSemestre: 2,
    libelle: '1er Trimestre',
    AnneeScolaire: '2017 - 2018'
  };

  private idForumCours = 3;
  private token;
  constructor(private sqlite: SQLite) {
    this.createDatabase();
    this.getStudent()
    .then((student) =>{
      this.token = student[0].matricule;
      console.log('le tokene est ' + this.token);
    })
    .catch((e) =>{
      console.log(e);
    });
   }

   getToken(){
     return this.token;
   }

  createDatabase(){
     this.sqlite.create({
      name: 'gitechDb',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      console.log('la base de données est bien créée ');
      this.db = db;
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Personnes (
        idPersonnes INTEGER PRIMARY KEY,
        nom VARCHAR(45) NULL,
        prenom VARCHAR(45) NULL,
        adresse VARCHAR(45) NULL,
        email VARCHAR(45) NULL,
        dateNaissance VARCHAR(45) NULL,
        lieuNaissance VARCHAR(45) NULL,
        nationalité VARCHAR(45) NULL,
        username VARCHAR(45) NULL,
        numCni VARCHAR(45) NULL,
        telephone VARCHAR(45) NULL)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Eleves (
        matricule INTEGER PRIMARY KEY,
        tuteur INT NOT NULL,
        CONSTRAINT fk_Eleves_Personnes1
          FOREIGN KEY (matricule)
          REFERENCES Personnes (idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Eleves_Tuteurs1
          FOREIGN KEY (tuteur)
          REFERENCES Tuteurs (idTuteur)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Tuteurs (
        idTuteur INTEGER PRIMARY KEY,
        CONSTRAINT fk_Tuteurs_Personnes1
          FOREIGN KEY (idTuteur)
          REFERENCES Personnes (idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS AnneeScolaire (
        libelleAn VARCHAR(20) NOT NULL PRIMARY KEY)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS DocFinacier (
        numero INTEGER PRIMARY KEY,
        AnneeScolaire VARCHAR(45) NULL,
        libellePay VARCHAR(45) NULL,
        montant VARCHAR(45) NULL,
        auteur INT NOT NULL,
        date VARCHAR(20) NOT NULL,
        CONSTRAINT fk_DossierFinacier_AnneeScolaire1
          FOREIGN KEY (AnneeScolaire)
          REFERENCES AnneeScolaire (libelleAn)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_DossierFinacier_Eleves1
          FOREIGN KEY (auteur)
          REFERENCES Personnes (Personnes_idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Semestres (
        idSemestre INTEGER PRIMARY KEY AUTOINCREMENT,
        semestre VARCHAR(45) NULL,
        AnneeScolaire VARCHAR(20) NOT NULL,
        CONSTRAINT fk_Semestres_AnneeScolaire1
          FOREIGN KEY (AnneeScolaire)
          REFERENCES AnneeScolaire (libelleAn)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e => {
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Classes (
        idClasses INTEGER PRIMARY KEY AUTOINCREMENT,
        classe VARCHAR(45) NULL)`, [] );
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS professeurs (
        Personnes_idPersonnes INTEGER PRIMARY KEY,
        CONSTRAINT fk_professeurs_Personnes1
          FOREIGN KEY (Personnes_idPersonnes)
          REFERENCES Personnes (idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Cours (
        idCours INTEGER PRIMARY KEY AUTOINCREMENT,
        cours VARCHAR(45) NULL,
        classe INT NULL,
        idSemester INT NULL,
        coef INT(11) NULL,
        professeur INT NOT NULL,
        CONSTRAINT fk_Cours_Classes1
          FOREIGN KEY (classe)
          REFERENCES Classes (idClasses)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Cours_Semestres1
          FOREIGN KEY (idSemester)
          REFERENCES Semestres (idSemestre)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Cours_professeurs1
          FOREIGN KEY (professeur)
          REFERENCES professeurs(Personnes_idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql('CREATE TABLE IF NOT EXISTS Forums (\
        idForum INTEGER PRIMARY KEY AUTOINCREMENT,\
        type VARCHAR(45) NULL)', []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Sujets (
        idSujet INTEGER PRIMARY KEY AUTOINCREMENT,
        titre VARCHAR(250) NULL,
        contenue VARCHAR(45) NULL,
        Cours_idCours INT NULL,
        Forums_idForum INT NOT NULL,
        Personnes_idPersonnes INT NOT NULL,
        CONSTRAINT fk_Sujets_Cours1
          FOREIGN KEY (Cours_idCours)
          REFERENCES Cours (idCours)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Sujets_Forums1
          FOREIGN KEY (Forums_idForum)
          REFERENCES Forums (idForum)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Sujets_Personnes1
          FOREIGN KEY (Personnes_idPersonnes)
          REFERENCES Personnes (idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql('CREATE TABLE IF NOT EXISTS Commentaires (\
        idCommentaires INTEGER PRIMARY KEY AUTOINCREMENT,\
        description MEDIUMTEXT NULL,\
        Sujets_idSujet INT NULL,\
        Personnes_idPersonnes INT NOT NULL,\
        CONSTRAINT fk_Commentaires_Sujets1\
          FOREIGN KEY (Sujets_idSujet)\
          REFERENCES Sujets (idSujet)\
          ON DELETE NO ACTION\
          ON UPDATE NO ACTION,\
        CONSTRAINT fk_Commentaires_Personnes1\
          FOREIGN KEY (Personnes_idPersonnes)\
          REFERENCES Personnes (idPersonnes)\
          ON DELETE NO ACTION\
          ON UPDATE NO ACTION)', []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS Notes (
        libelleNote VARCHAR(20),
        note FLOAT NOT NULL,
        pourcentage FLOAT,
        idCours INT NOT NULL,
        mention VARCHAR(45) NULL,
        appréciation VARCHAR(45) NULL,
        idEleve INT NOT NULL,
        PRIMARY KEY (idCours, idEleve, libelleNote),
        CONSTRAINT fk_Notes_Cours1
          FOREIGN KEY (idCours)
          REFERENCES Cours (idCours)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Notes_Eleves1
          FOREIGN KEY (idEleve)
          REFERENCES Eleves (Personnes_idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS EleveSemestre (
        Semestres_idSemestre INTEGER,
        Classes_idClasses INTEGER,
        Eleves_Personnes_idPersonnes INTEGER,
        PRIMARY KEY (Semestres_idSemestre, Classes_idClasses, Eleves_Personnes_idPersonnes),
        CONSTRAINT fk_EleveSemestre_Semestres1
          FOREIGN KEY (Semestres_idSemestre)
          REFERENCES Semestres (idSemestre)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_EleveSemestre_Classes1
          FOREIGN KEY (Classes_idClasses)
          REFERENCES Classes (idClasses)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_EleveSemestre_Eleves1
          FOREIGN KEY (Eleves_Personnes_idPersonnes)
          REFERENCES Eleves (matricule)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)` , []);
    })
    .catch(e =>{
      console.log(e);
    })
    .then(() => {
      this.db.executeSql(`CREATE TABLE IF NOT EXISTS EleveAnnée (
        Eleves_Personnes_idPersonnes INT NOT NULL,
        AnneeScolaire VARCHAR(20) NOT NULL,
        PRIMARY KEY (Eleves_Personnes_idPersonnes, AnneeScolaire),
        CONSTRAINT fk_EleveAnnée_Eleves1
          FOREIGN KEY (Eleves_Personnes_idPersonnes)
          REFERENCES Eleves (Personnes_idPersonnes)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_EleveAnnée_AnneeScolaire1
          FOREIGN KEY (AnneeScolaire)
          REFERENCES AnneeScolaire (libelleAn)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`, []);
    })
    .catch(e =>{
      console.log(e);
    });

    //  this.insertTuteur();
    //  this.insertEleve();
  }

  insertEleve(){
    this.db.executeSql('SELECT * FROM Eleves', [])
    .then((data) =>{
      if (data.rows.length  == 0) {
        this.db.executeSql(`INSERT INTO Personnes(idPersonnes, nom, prenom, adresse, email, dateNaissance,\
          lieuNaissance, nationalité, username,\
          numCni, telephone) VALUES(11034, 'Nom1476',
          'Prénom1476', 'Sicap-Mbao', 'kande@gmail.com', '15/06/87', 'COCODY', 'Sénégalaise', 
          'KandeAbdou','1934201301439', '781870147')`, [] )
        .catch(e => {
        console.log(e);
        })
        .then((res) =>{
        console.log('l\'élève est bien inséré dans la table personne');
        this.db.executeSql('INSERT INTO Eleves(matricule, tuteur) VALUES(11034, 1476)', [] )
        .then((res) =>{
        console.log('élève bien inséré');
        return res;
        })
        .catch(e =>{
          console.log(e);
        });
        return res;
        });
      }
      else {
        console.log('vous etes deja ajouté dans la base données');
      }
    }).catch(e => {
      console.log(e);
    });
  }

  getIdForumCours(){
    return this.idForumCours;
  }

  insertTuteur() {
    this.db.executeSql('SELECT * FROM Tuteurs', [])
    .then((data)  =>{
    if(data.rows.length <= 0) {
      this.db.executeSql(`INSERT INTO Personnes(idPersonnes, nom, prenom, adresse, email, dateNaissance,
        lieuNaissance, nationalité, username,
        numCni, telephone) VALUES(1476, 'NomTuteur1476',
        'PrénomTuteur1476', 'tuteur@gmail.com', 'Sicap-Mbao', '15/06/78', 'COCODY', 'Sénégalaise', 
        'tuteur','1934201301439', '781870147')` , [])
        .catch((e) =>{
          console.log(e);
        })
        .then((res) =>{
          console.log('tuteur inséré dans la table personnes');
          this.db.executeSql('INSERT INTO Tuteurs(idTuteur) VALUES(last_insert_rowid())', [] )
          .then(res =>{
            console.log('Tuteur bien inséré');
            return res;
          })
          .catch(e =>{
            console.log(e);
          });
          return res;
        });
      }
      else{
        console.log('le tuteur est déja inséré');
      }
    })
      .catch((e) =>{
        console.log(e);
      });
  }

  getStudent(){
    let students = [];
    return new Promise((resolve, reject ) => {
      this.db.executeSql('SELECT * FROM Eleves, Personnes  WHERE Eleves.matricule = Personnes.idPersonnes', [])
      .then((data)  =>{
        if(data == null) {
          console.log('pas de données');
          return;
        }
        if(data.rows){
            for (let i = 0; i < data.rows.length; i++) {
              students.push(data.rows.item(i));
            }
          }
        resolve(students);
        }, (error) =>{
          reject(error);
        });
      });
  }

  insertProf(){
    let nom = 'NomProf';
    let prenom = 'PrenomProf';
    for (let i = 1; i <= 9; i++) {
      nom += i;
      prenom += i;
      this.db.executeSql(`INSERT INTO Personnes(idPersonnes, nom, prenom, adresse, email, dateNaissance,
      lieuNaissance, nationalité, username,
      numCni, telephone) VALUES( ?, ?, ?, 'prof@gmail.com', 'Sicap-Mbao', '15/06/78', 'COCODY', 'Sénégalaise',
      'tuteur','1934201301439', '781870147')`, [i, nom, prenom])
      .then((res) => {
        this.db.executeSql('INSERT INTO professeurs(Personnes_idPersonnes) VALUES(?)', [i])
        .then((res) => {
          console.log('le prof ' + i + ' est bien inséré');
          return res;
        })
        .catch(e => {
          console.log(e);
        });
        return res;
      })
      .catch(e => {
        console.log(e);
      });
      nom = 'NomProf';
      prenom = 'PrenomProf';
    }
  }

  loadData(){
    this.db.executeSql(`INSERT INTO AnneeScolaire(libelleAn) VALUES('2017 - 2018')`, [])
    .then((res) => {
      console.log('Années scolaire est bien insérée');
      this.db.executeSql(`INSERT INTO Semestres(idSemestre, semestre, AnneeScolaire)
       VALUES(1, '1er Trimestre', '2017 - 2018')`, [])
      .then((res) => {
       console.log('le semestre est inséré');
       this.db.executeSql(`INSERT INTO Classes(idClasses, classe) VALUES(1, 'Tle S2')`, [])
       .then((res) =>{
         console.log('la classe est enregistrée');
         this.db.executeSql(`INSERT INTO EleveAnnée VALUES(1476, 1)`, [])
         .then((res) =>{
           console.log('ELeve Année est bien enregistré');
           this.db.executeSql(`INSERT INTO EleveSemestre VALUES(1,1,1476)`, [])
           .then((res) => {
             console.log('eleve semestre est bien inséré');
             return res;
           })
           .catch(e =>{
             console.log(e);
           });
           return res;
         })
         .catch(e =>{
           console.log(e);
         });
         return res;
       })
       .catch(e =>{
         console.log(e);
       });
       return res;
      })
      .catch(e =>{
        console.log(e);
      });
      return res;
    })
    .catch(e =>{
      console.log(e);
    });
  }

  insertCours() {
   
    this.courses.forEach(element => {
      this.db.executeSql(`INSERT INTO Cours VALUES(?, ?, ?, ?, ?, ?)`, [
        element.id,
        element.nom,
        element.classe,
        element.semestre,
        element.coef,
        element.prof
      ])
      .catch(e =>{
        console.log(e);
      })
      .then((res) =>{
        console.log('le cours inséré: ' + element.nom);
      });
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  async insertNotes(){
    // this.db.executeSql('DELETE FROM Notes', [])
    // .then((res) =>{
    //   console.log('Note sup');
    // })
    // .catch((e) =>{
    //       console.log(e);
    //   });
    let note = 0;
    let mention = '';
    let appreciation = '';
    for (let i = 1; i <= this.courses.length; i++) {
      note = this.getRandomInt(20);
      if((note >= 0) && (note <= 9)){
        mention = '';
        appreciation = 'Insuffisant';
    }
      if((note > 9) && (note <12)){
          mention = 'Passable';
          appreciation = 'Peux mieux faire';
      }
      else if((note >= 12) && (note <14)){
        mention = 'Assez bien';
        appreciation = 'Bon travail';
      }
      else if((note >= 14) && (note <16)){
        mention = 'Bien';
        appreciation = 'Tres Bon travail';
      }
      else if((note >=16)){
        mention = 'Tres bien';
        appreciation = 'Excellent travail';
      }
      try {
        await this.db.executeSql('INSERT INTO Notes VALUES(?, ?, ?, ?, ?, ?, ?)', ['Examen', note, 25, i+10, mention, appreciation, 11034]);
      } catch (error) {
        console.log(error);
      }
      console.log('Note insere avec la note ' + note);
    }
  }

  getCours(){
    let cours = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM Cours', [])
      .then((data) =>{
        if (data == null) {
          console.log('pas de données');
          return;
        }
        if(data.rows){
          console.log('sépatio');
          for (let i = 0; i < data.rows.length - 1; ++i) {
            console.log(data.rows.item(i));
            this.getPersonneById(data.rows.item(i).professeur). // remplacer l'id du prof par son nom après la rcupration
            then((teacher: any) => {
                data.rows.item(i).professeur = teacher.nom + ' ' + teacher.prenom;
                console.log(data.rows.item(i));
                cours.push(data.rows.item(i));
            })
            .catch((e) =>{
              console.log('erroree' + e);
            });
          }
          resolve(cours);
        }
      }, (e) => {
        reject(JSON.stringify(e));
      });
    });
  }

  getCoursByYears(year){
    const req = `SELECT * FROM Cours AS C JOIN Semestres AS S ON 
    (C.semestre = S.idSemestre AND S.AnneeScolaire = ?)`;
    console.log(req);
    let cours = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql(req, [year])
      .then((data) =>{
        if (data == null) {
          console.log('pas de données');
          return;
        }
        if(data.rows){
          for (let i = 0; i < data.rows.length - 1; ++i) {
            this.getPersonneById(data.rows.item(i).professeur). // remplacer l'id du prof par son nom après la rcupration
            then((teacher: any) => {
                data.rows.item(i).professeur = teacher.nom + ' ' + teacher.prenom;
                cours.push(data.rows.item(i));
            })
            .catch((e) =>{
              console.log('erroree' + e);
            });
          }
          resolve(cours);
        }
      }, (e) => {
        reject(JSON.stringify(e));
      });
    });
  }

    getNotes(){
    const notes = [];
    return new Promise((resolve , reject) => {
       this.db.executeSql('SELECT * FROM Notes', [])
      .then(async (data: any) =>{
        if(data == null){
          throw new Error('Pas de données');
        }
        if (data.rows) {
          for (let i = 0; i < data.rows.length; i++) {
            await this.getCoursById(data.rows.item(i).idCours)
            .then((course: any) => {
              if(course != null){
                data.rows.item(i).idCours = course.cours + '';
                notes.push(data.rows.item(i));
              }
            })
            .catch((e) => {
              console.log('erreur ' + e);
            });
          }
          resolve(notes);
        }
      }, (error) =>{
        reject(error);
      });
    });
  }

  insertIntoDocFin(){
    const num = 204;
    const year = '2017 - 2018';
    const auteur = 1476;
    const libelle = 'Versement du mois de Decembre';
    const montant = 35000;
    const date = '02/02/18 - 21:24';
    this.db.executeSql('INSERT INTO DocFinacier Values (?, ?, ?, ?, ?, ?) ', [num, year, libelle, montant, auteur, date])
    .then((res) =>{
      console.log('Reçu bien inséré ');
      return res;
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  getControle(){
    let controles = [];
    return new Promise((resolve , reject) => {
      this.db.executeSql('SELECT DISTINCT libelleNote FROM Notes', [])
      .then((data) =>{
        if(data == null){
          throw new Error('Pas de données');
        }
        if (data.rows) {
          for (let i = 0; i < data.rows.length; i++) {
            console.log(data.rows.item(i));
            controles.push(data.rows.item(i));
          }
        }
        resolve(controles);
      }, (error) =>{
        reject(error);
      });
    });
  }

   getPersonneById(id){
    return new Promise((resolve , reject) => {
      this.db.executeSql('SELECT * FROM Personnes WHERE idPersonnes = ?', [id])
      .then((data) =>{
        if(data == null){
          throw new Error('Pas de données');
        }
        if (data.rows) {
          // console.log(data.rows.item(0));
          resolve(data.rows.item(0));
        }
      }, (error) =>{
        reject(error);
      });
    });
  }

  getSchoolYears(){
    let schoolYears = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM AnneeScolaire', [])
      .then((years) =>{
        if(years == null){
          throw new Error('Pas de données');
        }
        if(years.rows){
          for (let i = 0; i < years.rows.length; i++) {
            schoolYears.push(years.rows.item(i));
          }
        }
        resolve(schoolYears);
      }, (error) =>{
        reject(error);
      });
    });
  }

  getSemestre(){
    let semestres = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM Semestres DESC', [])
      .then((years) =>{
        if(years == null){
          throw new Error('Pas de données');
        }
        if(years.rows){
          for (let i = 0; i < years.rows.length; i++) {
            semestres.push(years.rows.item(i));
          }
        }
        resolve(semestres);
      }, (error) =>{
        reject(error);
      });
    });
  }

  getDocFin(){
    const doc = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM DocFinacier', [])
      .then(async (data) =>{
        if(data == null){
          throw new Error('Pas de données');
        }
        if(data.rows){
          for (let i = 0; i < data.rows.length; i++) {
            await this.getPersonneById(data.rows.item(i).auteur) // remplacer l'id du prof par son nom après la rcupration
            .then((personne: any) => {
              data.rows.item(i).auteur = personne.nom + ' ' + personne.prenom;
              doc.push(data.rows.item(i));
            })
            .catch((e) =>{
              console.log('erroree' + e);
            });
          }
        }
        resolve(doc);
      }, (error) =>{
        reject(error);
      });
    });
  }

   getCoursById(id){
    return new Promise((resolve , reject) => {
      this.db.executeSql('SELECT * FROM Cours WHERE idCours = ?', [id])
      .then((data) =>{
        if(data == null){
          throw new Error('Pas de données');
        }
        if (data.rows) {
          // console.log(data.rows.item(0));
          resolve(data.rows.item(0));
        }
      }, (error) =>{
        reject(error);
      });
    });
  }

  getCoursBySemester(semester: any, type){
    const param = semester;
    const req = `SELECT * FROM Cours AS C JOIN Semestres AS S ON
      (C.idSemester = ? AND S.semestre = ? AND S.AnneeScolaire = ?)`;
    console.log(param);
    let cours = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql(req, param)
      .then((data) =>{
        if (data == null) {
          console.log('pas de données');
          return;
        }
        if(data.rows){
          console.log(data.rows);
          for (let i = 0; i < data.rows.length -1; ++i) {
            this.getPersonneById(data.rows.item(i).professeur). // remplacer l'id du prof par son nom après la rcupration
            then((teacher: any) => {
                data.rows.item(i).professeur = teacher.nom + ' ' + teacher.prenom;
                cours.push(data.rows.item(i));
            })
            .catch((e) =>{
              console.log('erroree' + e);
            });
          }
          resolve(cours);
        }
      }, (e) => {
        reject(JSON.stringify(e));
      });
    });
  }

  insertForum(){
    const typeOfForums = ['General', 'Parent', 'Cours'];
    for (let i = 0; i < typeOfForums.length; i++) {
      this.db.executeSql('INSERT INTO Forums values(?, ?)', [i, typeOfForums[i]])
      .then((res) =>{
        console.log('Forum bien inséré ' + typeOfForums[i]);
      })
      .catch((e) => console.log(e));
    }
  }

  insertSubjectIntoForum(idCours, title, content, forum, idPersonne){
    this.db.executeSql(`INSERT INTO Sujets(titre, contenue, Cours_idCours, Forums_idForum, Personnes_idPersonnes)
           VALUES(?,?,?,?,?)`, [title, content, idCours, forum, idPersonne])
      .then((res) =>{
        console.log('le sujet est bien inséré');
        return res;
      })
      .catch((e) =>{
        console.error(e);
      });
  }

  getForums(){
    let forums = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM Sujets', [])
      .then((data) =>{
        if(data == null){
          console.error('Pas de données');
          return;
        }
        if(data.rows){
          for (let i = 0; i < data.rows.length; i++) {
            forums.push(data.rows.item(i));
          }
        }
        resolve(forums);
      }, (error) =>{
        reject(error);
      });
    });
  }

  getCommentForSubject(id){
    let comments = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM Commentaires WHERE Sujets_idSujet = ?', [parseInt(id)])
      .then((data) =>{
        if(data == null){
          console.error('Pas de données');
          return;
        }
        if(data.rows){
          for (let i = 0; i < data.rows.length; i++) {
            comments.push(data.rows.item(i));
          }
        }
        resolve(comments);
      }, (error) =>{
        reject(error);
      });
    });
  }

  insertComment(idSubject, auteur, commentaire: String){
    this.db.executeSql(`INSERT INTO Commentaires(description, Sujets_idSujet, Personnes_idPersonnes) VALUES(?, ?, ?)`, [commentaire, idSubject, auteur])
      .then((res) =>{
        console.log('le Commentaire est bien inséré');
        return res;
      })
      .catch((e) =>{
        console.error(e);
      });
  }

  getForumsByCoursId(id:any){
    let sujets = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM Sujets WHERE Cours_idCours = ?', [parseInt(id)])
      .then((data) =>{
        if(data == null){
          console.error('Pas de données');
          return;
        }
        if(data.rows){
          for (let i = 0; i < data.rows.length; i++) {
            sujets.push(data.rows.item(i));
          }
        }
        resolve(sujets);
      }, (error) =>{
        reject(error);
      });
    });
  }
  getSujetById(id:any){
    let sujet = [];
    return new Promise((resolve, reject) =>{
      this.db.executeSql('SELECT * FROM Sujets WHERE idSujet = ?', [parseInt(id)])
      .then((data) =>{
        if(data == null){
          console.error('Pas de données');
          return;
        }
        if(data.rows){
          for (let i = 0; i < data.rows.length; i++) {
            sujet.push(data.rows.item(i));
          }
        }
        resolve(sujet);
      }, (error) =>{
        reject(error);
      });
    });
  }

}
