try {
	// Get the current document
	var pngDoc = activeDocument;
	
	// Get the current document name
	var destName = pngDoc.name;
	
	// If yes, the current document name is used
	// If not, the user is prompted to enter
	if (destName == undefined) {
		// A dialog box pops up, prompting for a file name
		destName = prompt("Please enter the file name", "icon_");
	} else {
		// Remove the suffix
		var index = destName.indexOf(".");
		if (index != -1) {
			destName = destName.substring(0, index);
		}
	}

	if (destName == undefined) {
		throw SyntaxError();
	}

	// If yes, the current document name is used
	// If not, the user is prompted to enter
	if (destName == undefined) {
		// A dialog box pops up, prompting for a file name
		destName = prompt("Please enter the file name", "icon_");
	} else {
		// Remove the suffix
		var index = destName.indexOf(".");
		if (index != -1) {
			destName = destName.substring(0, index);
		}
	}

	if (destName == undefined) {
		throw SyntaxError();
	}

	// A folder selection window pops up, prompting to select the folder for the output icon
	var destFolder = Folder.selectDialog("Select the folder for the output icon");

	if (destFolder == undefined) {
		throw SyntaxError();
	}

	// Define the deflation factor
	var icons = 
	[
		{	name: "icon_16x16",		width: 16,	height: 16,		deflate: 1 },	// 1x	
		{	name: "icon_32x32",		width: 32,	height: 32,		deflate: 1 },	// 1x
		{	name: "icon_48x48",		width: 48,	height: 48,		deflate: 1 },	// 1x
		{	name: "icon_64x64",		width: 64,	height: 64,		deflate: 1 },	// 1x
		{	name: "icon_128x128",	width: 128,	height: 128,	deflate: 1 },	// 1x
		{	name: "icon_256x256",	width: 256,	height: 256,	deflate: 1 },	// 1x		
	];

	// indicates that the output format is PNG, and sets the output PNG without PNG8 compression to ensure the quality of the icons
	var option = new PNGSaveOptions();
	 
	// Save the current history to make it easier to scale the image and then return to the size of the original state
	option.PNG8 = false;
	var startState = pngDoc.historyStates[pngDoc.historyStates.length - 1];

	// Iterate through an array of all icon objects
	for (var i = 0; i < icons.length; i++) {
		// Get the current icon object
		var icon = icons[i];

		// Get the current icon name
		var iconName = icon.name;

		// Get the current icon width
		var iconWidth = icon.width;

		// Get the current icon height
		var iconHeight = icon.height;

		// Get the current icon deflation factor
		var iconDeflate = icon.deflate;

		// Get the current icon scale
		var iconScale = icon.scale;


		// Get the current icon file name
		var iconFileName =  "logo"+ "_" + iconWidth + "x" + iconHeight + ".png";

		// Get the current icon file path
		var iconFilePath =  destFolder + "/" + iconFileName;

		// Scale the image to the current icon width and height
		pngDoc.resizeImage(UnitValue(iconWidth, "px"), UnitValue(iconHeight, "px"), null, ResampleMethod.BICUBIC);

		// Save the current history to make it easier to scale the image and then return to the size of the original state
		pngDoc.saveAs(File(iconFilePath), option, true, Extension.LOWERCASE);
		pngDoc.activeHistoryState = startState;
	}

	// Close the current document
	pngDoc.close(SaveOptions.DONOTSAVECHANGES);

	// Alert the user that the script has finished
	alert("The script has finished");
}
catch (e) {
	// Alert the user that the script has finished
	alert("The script has finished with errors");
}
// End of script