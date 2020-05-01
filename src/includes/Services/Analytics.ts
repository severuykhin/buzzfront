/**
 * Цели аналитики
 */
export const METRIKA_COUNTER = 56789968;

export const WIDGET_CREATE = 'widget-create'; //Создание нового виджета
export const WIDGET_DELETE = 'widget-delete';
export const WIDGET_PUBLISH = 'widget-publish';
export const WIDGET_EDIT = 'widget-edit';
export const WIDGET_AUDIENCE_HIT = 'widget-audience-hit';
export const WIDGET_UNDO_STATE = 'widget-undo-state';

export const ANALITICS_WIDGET_CATEGORY = 'widget';

interface MetricaGoal {
    target: string // Goal identifier
}

interface AnalyticsGoal {
    action: string // Goal identifier,
    category: string
}

declare global {
    interface Window {
        ym: any,
        gtag: any
    }
}

const AnalyticsInstance = {
    goal: function (identifier: string) {
        this.sendYandex({ 
            target: identifier 
        });
        this.sendGoogle({ 
            action: identifier, 
            category: ANALITICS_WIDGET_CATEGORY 
        })
    },

    sendYandex: function (goal: MetricaGoal) {
        if (typeof window.ym !== 'undefined') {
            window.ym(METRIKA_COUNTER, 'reachGoal', goal.target);
        }
    },

    sendGoogle: function (goal: AnalyticsGoal) {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', goal.action, {
                event_category: goal.category,
                event_action: goal.action 
            });
        }
    }
};

export const Analytics = Object.freeze(AnalyticsInstance);