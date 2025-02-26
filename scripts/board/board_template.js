function getExampleCard(index, subtasks, progress) {
    return `<div class="card" draggable="true">
                                <div id="category_${index}" class="task_category technical_task">${currentTasks[index].category}</div>
                                <div>
                                    <div class="task_name">${currentTasks[index].title}</div>
                                    <div id="description_${index}" class="task_description">${currentTasks[index].description}...</div>
                                </div>
                                <div id="subtasks_${index}" class="progress_box">
                                    <div class="progress_bar">
                                        <div id="progress_${index}" class="progress" style="width: ${progress}%;"></div>
                                    </div>
                                    <div style="display: flex; flex-direction: row; gap: 1px; align-items: center;">
                                        <h4 id="subtasks_done" style="font-weight: 400;">${currentTasks[index].subtasks.number_of_finished_subtasks}</h4>
                                        <h4 style="font-weight: 400;">/</h4>
                                        <h4 id="subtasks_total" style="font-weight: 400;">${subtasks}</h4><br><br>
                                        <h4 style="font-weight: 400;">Subtasks</h4>
                                    </div>
                                    
                                </div>
                                <div class="card_footer">
                                    <div id="Profile_badges_${index}" class="profile_badges">
                                        
                                    </div>
                                    <img class="prio_icon ${currentTasks[index].prio}" src="..//assets/icons/${currentTasks[index].prio}.png" alt="priority indicator">
                                </div>
                                
        
                            </div>`
}

function getContactIcon() {
    return  `   <div id="profile_orange" class="profile_badge profile_orange first_profile">AM</div>
                <div id="profile_green" class="profile_badge profile_green second_profile">EM</div>
                <div id="profile_purple" class="profile_badge profile_purple third_profile">MB</div>
    `

}



function getUserStoryCard() {
    return `<div class="card" draggable="true">
                                <div class="task_category user_story">User story</div>
                                <div>
                                    <div class="task_name">Kochwelt Page & Recipe Recommender</div>
                                    <div class="task_description">Build start page with recipe recommendation...</div>
                                </div>
                                <div class="progress_box">
                                    <div class="progress_bar">
                                        <div class="progress" style="width: 50%;"></div>
                                    </div>
                                    <div style="display: flex; flex-direction: row; gap: 1px; align-items: center;">
                                        <h4 id="subtasks_done" style="font-weight: 400;">1</h4>
                                        <h4 style="font-weight: 400;">/</h4>
                                        <h4 id="subtasks_total" style="font-weight: 400;">2</h4><br><br>
                                        <h4 style="font-weight: 400;">Subtasks</h4>
                                    </div>
                                    
                                </div>
                                <div class="card_footer">
                                    <div class="profile_badges">
                                        <div id="profile_orange" class="profile_badge profile_orange first_profile">AM</div>
                                        <div id="profile_green" class="profile_badge profile_green second_profile">EM</div>
                                        <div id="profile_purple" class="profile_badge profile_purple third_profile">MB</div>
                                    </div>
                                    <img class="prio_icon" src="..//assets/icon/medium_prio.png" alt="medium priority">
                                </div>
                                
        
                            </div>`
}

function getUserStoryCard2() {
    return `<div class="card" draggable="true">
                                    <div class="task_category user_story">User story</div>
                                    <div>
                                        <div class="task_name">Kochwelt Page & Recipe Recommender</div>
                                        <div class="task_description">Build start page with recipe recommendation...
                                        </div>
                                    </div>
                                    <div class="progress_box">
                                        <div class="progress_bar">
                                            <div class="progress" style="width: 50%;"></div>
                                        </div>
                                        <div style="display: flex; flex-direction: row; gap: 1px; align-items: center;">
                                            <h4 id="subtasks_done" style="font-weight: 400;">1</h4>
                                            <h4 style="font-weight: 400;">/</h4>
                                            <h4 id="subtasks_total" style="font-weight: 400;">2</h4><br><br>
                                            <h4 style="font-weight: 400;">Subtasks</h4>
                                        </div>

                                    </div>
                                    <div class="card_footer">
                                        <div class="profile_badges">
                                            <div id="profile_orange" class="profile_badge profile_orange first_profile">
                                                AM</div>
                                            <div id="profile_green" class="profile_badge profile_green second_profile">
                                                EM</div>
                                            <div id="profile_purple" class="profile_badge profile_purple third_profile">
                                                MB</div>
                                        </div>
                                        <img class="prio_icon" src="..//assets/icons/medium_prio.png"
                                            alt="medium priority">
                                    </div>


                                </div>`
}





function getEmptyCard() {return `<div class="board_content_box" id="toDo" ondrop="moveTo(id)" ondragover="allowDrop(event)">
                                <div class="no_tasks">No tasks To do</div>
                            </div>`}

                                



function getTechnicalTaskCard() {return `<div class="card" draggable="true">
                                    <div class="task_category technical_task">Technical Task</div>
                                    <div>
                                        <div class="task_name">HTML Base Template Creation</div>
                                        <div class="task_description">Create reusable HTML base templates...</div>
                                    </div>
                                    <div class="card_footer">
                                        <div class="profile_badges">
                                            <div id="profile_pink" class="profile_badge profile_pink first_profile">DE
                                            </div>
                                            <div id="profile_blue" class="profile_badge profile_blue second_profile">BZ
                                            </div>
                                            <div id="profile_lightpurple"
                                                class="profile_badge profile_lightpurple third_profile">AS</div>
                                        </div>
                                        <img class="prio_icon prio_low" src="..//assets/icons/low_prio.png"
                                            alt="low priority">
                                    </div>


                                </div>`}


                            






function getUserStoryCard3() {return `<div class="card" draggable="true">
                                    <div class="task_category user_story">User story</div>
                                    <div>
                                        <div class="task_name">Daily Kochwelt Recipe</div>
                                        <div class="task_description">Implement daily recipe and portion calculator...
                                        </div>
                                    </div>
                                    <div class="card_footer">
                                        <div class="profile_badges">
                                            <div id="profile_yellow" class="profile_badge profile_yellow first_profile">
                                                EF</div>
                                            <div id="profile_lightpurple"
                                                class="profile_badge profile_lightpurple second_profile">AS</div>
                                            <div id="profile_red" class="profile_badge profile_red third_profile">TW
                                            </div>
                                        </div>
                                        <img class="prio_icon" src="..//assets/icons/medium_prio.png"
                                            alt="medium priority">
                                    </div>
                                </div>`}

                                




function getTechnicalTask2() {return `<div class="card" draggable="true">
                                    <div class="task_category technical_task">Technical Task</div>
                                    <div>
                                        <div class="task_name">CSS Architecture Planning</div>
                                        <div class="task_description">Define CSS naming conversations and structure...
                                        </div>
                                    </div>
                                    <div class="progress_box">
                                        <div class="progress_bar">
                                            <div class="progress" style="width: 100%;"></div>
                                        </div>
                                        <div style="display: flex; flex-direction: row; gap: 1px; align-items: center;">
                                            <h4 id="subtasks_done" style="font-weight: 400;">2</h4>
                                            <h4 style="font-weight: 400;">/</h4>
                                            <h4 id="subtasks_total" style="font-weight: 400;">2</h4><br><br>
                                            <h4 style="font-weight: 400;">Subtasks</h4>
                                        </div>

                                    </div>
                                    <div class="card_footer">
                                        <div class="profile_badges">
                                            <div id="profile_turquoise"
                                                class="profile_badge profile_turquoise first_profile">SM</div>
                                            <div id="profile_blue" class="profile_badge profile_blue second_profile">BZ
                                            </div>
                                        </div>
                                        <img class="prio_icon" src="..//assets/icons/medium_prio.png"
                                            alt="medium priority">
                                    </div>
                                </div>`}


                                