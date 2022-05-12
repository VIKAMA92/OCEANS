package edu.stanford.bmir.protege.web.client.help;

import edu.stanford.bmir.protege.web.client.aboutoceans.AboutOceansBox;

/**
 * Author: Matthew Horridge<br>
 * Stanford University<br>
 * Bio-Medical Informatics Research Group<br>
 * Date: 10/09/2013
 */
public class ShowAboutOceansBoxHandlerImpl implements ShowAboutOceansBoxHandler {

    @Override
    public void handleShowAboutOceansBox() {
        AboutOceansBox aboutOceansBox = new AboutOceansBox();
        aboutOceansBox.show();
    }
}
