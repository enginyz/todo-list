document.addEventListener("DOMContentLoaded",function(){
    const taskInput = document.querySelector("#task-input"); 
    const addTaskButton = document.querySelector("#add-task"); 
    const taskList = document.querySelector("#task-list");

    loadTasks();

    addTaskButton.addEventListener("click",function(){
        addTask(taskInput.value);
        taskInput.value = "";
    });

    taskInput.addEventListener("keypress",function(e){
        if (e.key === "Enter") {
            addTask(taskInput.value);
            taskInput.value = "";
        }
    });

    function addTask(taskText, shouldSave = true) {
        if (!taskText || typeof taskText !== "string" || taskText.trim() === "") {
            console.warn("Geçersiz görev metni:", taskText); // Konsolda hata ayıklama için
            return;
        }
    
        console.log("Yeni görev ekleniyor:", taskText);
    
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-200 p-2 rounded-md shadow-sm";
        li.innerHTML = `
            <span class="text-gray-800">${taskText}</span>
            <button class="text-red-500 hover:text-red-700 transition delete-btn">❌</button>
        `;
    
        taskList.appendChild(li);
    
        if (shouldSave) {
            saveTasks();
        }
    
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
            saveTasks();
        });
    }

    function saveTasks(){
        const tasks = [];
        document.querySelectorAll("#task-list li span").forEach(taskElement =>{
            tasks.push(taskElement.textContent);
        });
        console.log("Kaydedilen Görevler:", tasks);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
    
        if (!storedTasks) {
            console.warn("Local Storage boş, yüklenmedi.");
            return;
        }
    
        let tasks;
        try {
            tasks = JSON.parse(storedTasks);
        } catch (error) {
            console.error("Local Storage verisi bozuk, temizleniyor...");
            localStorage.removeItem("tasks");
            return;
        }
    
        console.log("Yüklenen Görevler:", tasks);
    
        if (Array.isArray(tasks)) {
            tasks.forEach(task => {
                console.log("Ekrana ekleme çağrılıyor:", task);
                addTask(task, false);
            });
        } else {
            console.error("Beklenmeyen veri formatı, Local Storage temizleniyor...");
            localStorage.removeItem("tasks");
        }
    }
});