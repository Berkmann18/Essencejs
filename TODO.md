# To do:
-   Looking for a more efficient way to add CSS styles for each "DOM adders" (e.g: simpleTable, DB)

# To add:
-   Having a dynamic real-time table/update (e.g: news feeds)
-	Adding the Download bar and task progress list
-	Having the real-time chat feature as well as the console one
-	Currency conversion
-	Calendar
-	Password checker
-	History (event history, command history, viewed pages, ...)
-	Colour.getColourName() (prototype already placed)
-	Heap ?
-	cookie historic for multi cookie storage !?
-	greyish hover effect for rows/columns headers that would highlight the whole row/column
-	select, datetime, datetime-local, time, month, range, search, week, url; to validate() (see [DOM]~validate)
-	Prim's alg (already there as A* ?!)
-	Kruskal's alg
-   Fully functional NoSQL/NoPHP server/database (with remote access, see [Web])

# To continue:
-	code highlighting feature for editors (see [Web]~Editor.highlightSyntax)
-	Parser for MIPS, Batch, Java, Python to DHTML/PHP and eventually to MIPS (see [Web]~Parser.run)
-   AI system that stores it's rules in a database and update it after learning (see [Misc]~AI)
-   Combinations maker: 3*[a, b, c] -> [aaa, aab, aac, ..., ccc] (see [DataStruct]~Comb)
-   Path finding alg using IDA* (see [DataStruct]~IDAstar)
-	Cumulative probabilities (see [Maths])
-	Webpage templating (see [Web]~WebPage)
-	Radial gradient generator (see [UI]~radialGradient)
-	WiFi testers (see [Web])
-	eqSolver (see [Maths]~eqSolver)
-	Graphic methods of the shapes (see [UI]~*.draw)
-	4x4+ matrix support for Array.rot (see [essence]~Array.rot)
-	4x4+ matrix support for Array.det (see [essence]~Array.det)
-	4x4+ matrix support for Array.getAdjoint (see [essence]~Array.getAdjoint)
-	5x5+ matrix support for Array.translate (see [essence]~Array.translate)
-	msgBox() (see [UI]~msgBox)
-	WebApp (see [Web]~WebApp)
-	Debugger (see [Web]~Debugger)
-	FA (see [Misc]~FA)
-	exp2dict (see [Misc]~exp2dict)
-	Alg formula to truth table (see [Maths]~truthTable, [Maths]~getDNF and [Maths]~getCNF)

# To fix:
-	Array.remove not affecting the array (see [essence]~Array.remove)
-	Array.getOccurences() (see [essence]~Array.getOccurences)
-	Array.revSort() which leaves a few elements unsorted (see [essence]~Array.revSort)
-	Machine.parse() for other bases than base 16 which tries to get string with a code "out of the visible" (see [Misc]~Machine.parse)
-	QueueList (see [DataStruct]~QueueList)
-	StackList (see [DataStruct]~StackList)
-	Archive.getResult (see [DataStruct]~Archive)
-	InvalidParamError (see [QTest]~InvalidParamError)
-	A (see [DataStruct]~A)   _might need reconPath to be fixed first !!_
-	reconPath (see [DataStruct]~reconPath)
-	Something like Java's System.in that allows the code to grab the user's input without having to use JS prompt, contentEditable or HTML's input/textarea fields (see [Misc]~Sys and [essence]~Essence.ask)
-	$Data, getting $Data.save to save at the desired place and making sure the rest works (see [Files]~$Data)

[essence]: 1.1/essence.js
[Ajax]: 1.1/modules/Ajax.js
[DataStruct]: 1.1/modules/DataStruct.js
[DOM]: 1.1/modules/DOM.js
[Files]: 1.1/modules/Files.js
[Maths]: 1.1/modules/Maths.js
[Misc]: 1.1/modules/Misc.js
[QTest]: 1.1/modules/QTest.js
[Security]: 1.1/modules/Security.js
[UI]: 1.1/modules/UI.js
[Web]: 1.1/modules/Web.js