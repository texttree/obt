
# release 0.10.0

Интерфейс приложения состоит из нескольких частей: AppBar (верхняя панель приложения) и Workspace (все остальное рабочее пространство).

AppBar отображает ссылку на то, что открыто сейчас в Workspace.
Здесь можно менять книгу и главу.

<p align="center"><img src="https://user-images.githubusercontent.com/74174349/125074047-73bedf00-e0c5-11eb-8134-8232abb2ea94.png">	</p>

В "гамбургер" (☰) добавлено меню с несколькими функциями:
<p align="center"><img src="https://user-images.githubusercontent.com/74174349/125184340-7fc1b280-e225-11eb-827e-c5d22fe8c03c.png">	</p>

 - смена языка интерфейса;
 - добавление карточек с ресурсами;
 - выбор размера шрифта в карточках;
 - комментарий о том как отправить уведомление об опечатке;
 - два шаблона с карточками.

В Workspace пользователь может управлять своим рабочим пространством, пользуясь карточками: добавлять, менять размер, перемещать, удалять. Можно загружать уже готовые шаблоны.


Перечень ресурсов (Библия, TN (Заметки), TQ (Вопросы), OBS (Открытые Библейские Истории), OBS-TN, OBS-TQ), которые поддерживает приложение, находятся в пункте меню "Добавить материал".

![GIF 11 07 2021 9-19-23](https://user-images.githubusercontent.com/74174349/125184793-5dca2f00-e229-11eb-9aca-86720366ce95.gif)

<!-- ![Workspace3](https://user-images.githubusercontent.com/74174349/125075733-af5aa880-e0c7-11eb-8903-ae0db24a075a.png) -->

Так как Заметки и Вопросы указываются не в общем для главы, а для конкретного стиха - в приложении это работает через клик.
После клика по стиху в карточках с Заметками или Вопросами подгружаются нужные данные. Это работает как для Библии, так и для OBS.

Клик правой кнопкой мыши по стиху вызывает контекстное меню, где пользователь может отправить уведомление об опечатке. 

![Workspace4](https://user-images.githubusercontent.com/74174349/125075754-b386c600-e0c7-11eb-97ec-e946d25833bc.png)

Для отправки такого уведомления пользователю необходимо написать свой комментарий.

![SendError](https://user-images.githubusercontent.com/74174349/125076698-e67d8980-e0c8-11eb-857b-f4d0f475d657.png)

После отправки ресурс, книга, глава и номер стиха вместе с текстом стиха и комментарием пользователя попадают в репозиторий.