const navButtons = {
    dashboardBtn: "dashboardContent",
    patientBtn: "patientContent",
    appointmentBtn: "appointmentContent",
    antenatalBtn: "antenatalContent",
    postnatalBtn: "postnatalContent",
    immunazationBtn: "immunizationContent",
    highBtn: "highContent",
    reportBtn: "reportContent",
    messageBtn: "messageContent",
    educationBtn: "educationContent"
};

function hideAllContent() {
    document.querySelectorAll(".main-content").forEach(function (section) {
        section.style.display = "none";
    });
}

function showSection(contentId) {
    hideAllContent();
    document.getElementById(contentId).style.display = "block";
}

Object.keys(navButtons).forEach(function (btnId) {

    const btn = document.getElementById(btnId);
    const contentId = navButtons[btnId];

    btn.addEventListener("click", function (event) {

        event.preventDefault();

        showSection(contentId);

        if (contentId === "reportContent") {
            updateReports();
        }

    });

});




const addPatientBtn = document.getElementById("addPatientBtn");
const cancelPatientBtn = document.getElementById("cancelPatientBtn");
const patientForm = document.getElementById("patientForm");
const patientFormTitle = patientForm.querySelector("h2");

const patientRegistrationForm =
    document.getElementById("patientRegistrationForm");

const patientTableBody =
    document.getElementById("patientTableBody");

const patientCount =
    document.getElementById("patientCount");

const patientSearch =
    document.getElementById("patientSearch");


let patients = [];
let editingPatientId = null;


addPatientBtn.addEventListener("click", function () {

    editingPatientId = null;
    patientRegistrationForm.reset();
    patientFormTitle.textContent = "Patient Registration";
    patientForm.style.display = "block";

});


cancelPatientBtn.addEventListener("click", function () {

    patientForm.style.display = "none";
    patientRegistrationForm.reset();
    editingPatientId = null;
    patientFormTitle.textContent = "Patient Registration";

});


patientRegistrationForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const patient = {

        id: document.getElementById("patientId").value,

        name: document.getElementById("patientName").value,

        dob: document.getElementById("patientDob").value,

        phone: document.getElementById("patientPhone").value,

        address: document.getElementById("patientAddress").value,

        bloodGroup: document.getElementById("bloodGroup").value,

        pregnancyStatus:
            document.getElementById("pregnancyStatus").value,

        emergencyContact:
            document.getElementById("emergencyContact").value

    };


    if (editingPatientId !== null) {

        const index = patients.findIndex(function (p) {
            return p.id === editingPatientId;
        });

        if (index !== -1) {
            patients[index] = patient;
        }

        editingPatientId = null;

    } else {

        patients.push(patient);

    }


    displayPatients();


    patientRegistrationForm.reset();

    patientForm.style.display = "none";

    patientFormTitle.textContent = "Patient Registration";

});




function displayPatients(list = patients) {

    patientTableBody.innerHTML = "";


    list.forEach(function (patient) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.phone}</td>

            <td>${patient.bloodGroup}</td>

            <td>${patient.pregnancyStatus}</td>

            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editPatient('${patient.id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="action-btn delete-btn"
                    onclick="deletePatient('${patient.id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        patientTableBody.appendChild(row);

    });


    patientCount.textContent =
        `${list.length} Patients`;

}




function editPatient(id) {

    const index = patients.findIndex(function (p) {
        return p.id === id;
    });

    if (index === -1) return;

    const patient = patients[index];

    document.getElementById("patientId").value = patient.id;
    document.getElementById("patientName").value = patient.name;
    document.getElementById("patientDob").value = patient.dob;
    document.getElementById("patientPhone").value = patient.phone;
    document.getElementById("patientAddress").value = patient.address;
    document.getElementById("bloodGroup").value = patient.bloodGroup;
    document.getElementById("pregnancyStatus").value = patient.pregnancyStatus;
    document.getElementById("emergencyContact").value = patient.emergencyContact;

    editingPatientId = id;
    patientFormTitle.textContent = "Edit Patient";
    patientForm.style.display = "block";

}




function deletePatient(id) {

    const index = patients.findIndex(function (p) {
        return p.id === id;
    });

    if (index === -1) return;

    patients.splice(index, 1);

    displayPatients();

}




patientSearch.addEventListener("input", function () {

    const searchValue =
        patientSearch.value.toLowerCase();


    const filteredPatients = patients.filter(function (patient) {

        return (

            patient.name.toLowerCase().includes(searchValue) ||

            patient.id.toLowerCase().includes(searchValue)

        );

    });


    displayPatients(filteredPatients);

});



const addAppointmentBtn = document.getElementById("addAppointmentBtn");
const cancelAppointmentBtn = document.getElementById("cancelAppointmentBtn");
const appointmentForm = document.getElementById("appointmentForm");

const appointmentFormData = document.getElementById("appointmentFormData");

const appointmentTableBody = document.getElementById("appointmentTableBody");
const appointmentCount = document.getElementById("appointmentCount");

let appointments = [];



addAppointmentBtn.addEventListener("click", () => {
    appointmentForm.style.display = "block";
});



cancelAppointmentBtn.addEventListener("click", () => {
    appointmentForm.style.display = "none";
    appointmentFormData.reset();
});



appointmentFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const appointment = {
        patient: document.getElementById("appPatient").value,
        date: document.getElementById("appDate").value,
        time: document.getElementById("appTime").value,
        service: document.getElementById("appService").value,
        status: document.getElementById("appStatus").value
    };

    appointments.push(appointment);

    displayAppointments();

    appointmentFormData.reset();
    appointmentForm.style.display = "none";

});



function displayAppointments() {

    appointmentTableBody.innerHTML = "";

    appointments.forEach((app, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.patient}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>${app.service}</td>
            <td>${app.status}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteAppointment(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        appointmentTableBody.appendChild(row);

    });

    appointmentCount.textContent = `${appointments.length} Appointments`;

}



function deleteAppointment(index) {

    appointments.splice(index, 1);

    displayAppointments();

}




const addAncBtn = document.getElementById("addAncBtn");
const cancelAncBtn = document.getElementById("cancelAncBtn");
const ancForm = document.getElementById("ancForm");

const ancFormData = document.getElementById("ancFormData");

const ancTableBody = document.getElementById("ancTableBody");
const ancCount = document.getElementById("ancCount");

let ancRecords = [];



addAncBtn.addEventListener("click", () => {
    ancForm.style.display = "block";
});



cancelAncBtn.addEventListener("click", () => {
    ancForm.style.display = "none";
    ancFormData.reset();
});



ancFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const anc = {

        patient: document.getElementById("ancPatient").value,
        lmp: document.getElementById("ancLmp").value,
        edd: document.getElementById("ancEdd").value,
        weeks: document.getElementById("ancWeeks").value,
        bp: document.getElementById("ancBp").value,
        weight: document.getElementById("ancWeight").value,
        temp: document.getElementById("ancTemp").value,
        fhr: document.getElementById("ancFhr").value

    };

    ancRecords.push(anc);

    displayAnc();

    ancFormData.reset();
    ancForm.style.display = "none";

});



function displayAnc() {

    ancTableBody.innerHTML = "";

    ancRecords.forEach((anc, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${anc.patient}</td>
            <td>${anc.lmp}</td>
            <td>${anc.edd}</td>
            <td>${anc.weeks}</td>
            <td>${anc.bp}</td>
            <td>${anc.weight}</td>
            <td>${anc.fhr}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteAnc(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        ancTableBody.appendChild(row);

    });

    ancCount.textContent = `${ancRecords.length} Records`;

}



function deleteAnc(index) {

    ancRecords.splice(index, 1);

    displayAnc();

}




const addPncBtn = document.getElementById("addPncBtn");
const cancelPncBtn = document.getElementById("cancelPncBtn");
const pncForm = document.getElementById("pncForm");

const pncFormData = document.getElementById("pncFormData");

const pncTableBody = document.getElementById("pncTableBody");
const pncCount = document.getElementById("pncCount");

let pncRecords = [];



addPncBtn.addEventListener("click", () => {
    pncForm.style.display = "block";
});



cancelPncBtn.addEventListener("click", () => {
    pncForm.style.display = "none";
    pncFormData.reset();
});



pncFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const record = {

        mother: document.getElementById("pncMother").value,
        date: document.getElementById("pncDate").value,
        method: document.getElementById("pncMethod").value,
        condition: document.getElementById("pncCondition").value,
        bp: document.getElementById("pncBp").value,
        temp: document.getElementById("pncTemp").value,
        bleeding: document.getElementById("pncBleeding").value,

        baby: document.getElementById("pncBaby").value,
        sex: document.getElementById("pncSex").value,
        weight: document.getElementById("pncWeight").value,
        feeding: document.getElementById("pncFeeding").value

    };

    pncRecords.push(record);

    displayPnc();

    pncFormData.reset();
    pncForm.style.display = "none";

});



function displayPnc() {

    pncTableBody.innerHTML = "";

    pncRecords.forEach((rec, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rec.mother}</td>
            <td>${rec.date}</td>
            <td>${rec.method}</td>
            <td>${rec.condition}</td>
            <td>${rec.baby}</td>
            <td>${rec.weight}</td>
            <td>${rec.feeding}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deletePnc(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        pncTableBody.appendChild(row);

    });

    pncCount.textContent = `${pncRecords.length} Records`;

}

function deletePnc(index) {

    pncRecords.splice(index, 1);

    displayPnc();

}




const addImmBtn = document.getElementById("addImmBtn");
const cancelImmBtn = document.getElementById("cancelImmBtn");
const immForm = document.getElementById("immForm");

const immFormData = document.getElementById("immFormData");

const immTableBody = document.getElementById("immTableBody");
const immCount = document.getElementById("immCount");

let immunizations = [];





addImmBtn.addEventListener("click", () => {
    immForm.style.display = "block";
});



cancelImmBtn.addEventListener("click", () => {
    immForm.style.display = "none";
    immFormData.reset();
});




immFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const record = {

        name: document.getElementById("immName").value,
        vaccine: document.getElementById("immVaccine").value,
        dose: document.getElementById("immDose").value,
        date: document.getElementById("immDate").value,
        next: document.getElementById("immNext").value,
        status: document.getElementById("immStatus").value

    };

    immunizations.push(record);

    displayImmunization();

    immFormData.reset();
    immForm.style.display = "none";

});




function displayImmunization() {

    immTableBody.innerHTML = "";

    immunizations.forEach((rec, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rec.name}</td>
            <td>${rec.vaccine}</td>
            <td>${rec.dose}</td>
            <td>${rec.date}</td>
            <td>${rec.next}</td>
            <td>${rec.status}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteImm(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        immTableBody.appendChild(row);

    });

    immCount.textContent = `${immunizations.length} Records`;

}



function deleteImm(index) {

    immunizations.splice(index, 1);

    displayImmunization();

}




const addHighBtn = document.getElementById("addHighBtn");
const cancelHighBtn = document.getElementById("cancelHighBtn");
const highForm = document.getElementById("highForm");

const highFormData = document.getElementById("highFormData");

const highTableBody = document.getElementById("highTableBody");
const highCount = document.getElementById("highCount");

let highCases = [];


addHighBtn.addEventListener("click", () => {
    highForm.style.display = "block";
});



cancelHighBtn.addEventListener("click", () => {
    highForm.style.display = "none";
    highFormData.reset();
});



highFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const record = {

        patient: document.getElementById("highPatient").value,
        weeks: document.getElementById("highWeeks").value,
        level: document.getElementById("highLevel").value,
        factor: document.getElementById("highFactor").value,
        follow: document.getElementById("highFollow").value,
        status: document.getElementById("highStatus").value

    };

    highCases.push(record);

    displayHigh();

    highFormData.reset();
    highForm.style.display = "none";

});



function displayHigh() {

    highTableBody.innerHTML = "";

    highCases.forEach((rec, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rec.patient}</td>
            <td>${rec.weeks}</td>
            <td>${rec.level}</td>
            <td>${rec.factor}</td>
            <td>${rec.follow}</td>
            <td>${rec.status}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteHigh(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        highTableBody.appendChild(row);

    });

    highCount.textContent = `${highCases.length} Records`;

}



function deleteHigh(index) {

    highCases.splice(index, 1);

    displayHigh();

}




const reportPatients = document.getElementById("reportPatients");
const reportAppointments = document.getElementById("reportAppointments");
const reportAnc = document.getElementById("reportAnc");
const reportPnc = document.getElementById("reportPnc");
const reportImm = document.getElementById("reportImm");
const reportHigh = document.getElementById("reportHigh");

const tablePatients = document.getElementById("tablePatients");
const tableAppointments = document.getElementById("tableAppointments");
const tableAnc = document.getElementById("tableAnc");
const tablePnc = document.getElementById("tablePnc");
const tableImm = document.getElementById("tableImm");
const tableHigh = document.getElementById("tableHigh");

const reportFilter = document.getElementById("reportFilter");



function updateReports() {


    reportPatients.textContent = patients.length;
    reportAppointments.textContent = appointments.length;
    reportAnc.textContent = ancRecords.length;
    reportPnc.textContent = pncRecords.length;
    reportImm.textContent = immunizations.length;
    reportHigh.textContent = highCases.length;


    tablePatients.textContent = patients.length;
    tableAppointments.textContent = appointments.length;
    tableAnc.textContent = ancRecords.length;
    tablePnc.textContent = pncRecords.length;
    tableImm.textContent = immunizations.length;
    tableHigh.textContent = highCases.length;

}



reportFilter.addEventListener("change", () => {
    updateReports();
});




const addMsgBtn = document.getElementById("addMsgBtn");
const cancelMsgBtn = document.getElementById("cancelMsgBtn");
const msgForm = document.getElementById("msgForm");

const msgFormData = document.getElementById("msgFormData");

const msgTableBody = document.getElementById("msgTableBody");
const msgCount = document.getElementById("msgCount");

let messages = [];



addMsgBtn.addEventListener("click", () => {
    msgForm.style.display = "block";
});



cancelMsgBtn.addEventListener("click", () => {
    msgForm.style.display = "none";
    msgFormData.reset();
});



msgFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const message = {

        receiver: document.getElementById("msgReceiver").value,
        subject: document.getElementById("msgSubject").value,
        text: document.getElementById("msgText").value,
        date: new Date().toLocaleDateString(),
        status: "Unread"

    };

    messages.push(message);

    displayMessages();

    msgFormData.reset();
    msgForm.style.display = "none";

});



function displayMessages() {

    msgTableBody.innerHTML = "";

    messages.forEach((msg, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${msg.receiver}</td>
            <td>${msg.subject}</td>
            <td>${msg.date}</td>
            <td>${msg.status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="markRead(${index})">
                    <i class="fa-solid fa-envelope-open"></i>
                </button>

                <button class="action-btn delete-btn" onclick="deleteMsg(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        msgTableBody.appendChild(row);

    });

    msgCount.textContent = `${messages.length} Messages`;

}



function markRead(index) {

    messages[index].status = "Read";

    displayMessages();

}



function deleteMsg(index) {

    messages.splice(index, 1);

    displayMessages();

}




const addEduBtn = document.getElementById("addEduBtn");
const cancelEduBtn = document.getElementById("cancelEduBtn");
const eduForm = document.getElementById("eduForm");

const eduFormData = document.getElementById("eduFormData");

const eduTableBody = document.getElementById("eduTableBody");
const eduCount = document.getElementById("eduCount");

let educationTopics = [];



addEduBtn.addEventListener("click", () => {
    eduForm.style.display = "block";
});



cancelEduBtn.addEventListener("click", () => {
    eduForm.style.display = "none";
    eduFormData.reset();
});



eduFormData.addEventListener("submit", function (e) {

    e.preventDefault();

    const topic = {

        title: document.getElementById("eduTitle").value,
        category: document.getElementById("eduCategory").value,
        text: document.getElementById("eduText").value,
        date: new Date().toLocaleDateString()

    };

    educationTopics.push(topic);

    displayEducation();

    eduFormData.reset();
    eduForm.style.display = "none";

});



function displayEducation() {

    eduTableBody.innerHTML = "";

    educationTopics.forEach((edu, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${edu.title}</td>
            <td>${edu.category}</td>
            <td>${edu.text}</td>
            <td>${edu.date}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteEdu(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        eduTableBody.appendChild(row);

    });

    eduCount.textContent = `${educationTopics.length} Topics`;

}



function deleteEdu(index) {

    educationTopics.splice(index, 1);

    displayEducation();

}
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function (event) {

    event.preventDefault();

    const confirmLogout = confirm("Una uhakika unataka ku-logout?");

    if (confirmLogout) {
        window.location.href = "index.html";
    }

});