'use client';

import styled from 'styled-components';
import { useState, useEffect, useTransition } from 'react';
import { getAlertPreferences, updateAlertPreferences } from '@/lib/settings/actions';
import { Button } from '@/components/ui/primitives';

const Container = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 800px;
`;

const Header = styled.div`
  padding: 32px 32px 0 32px;
`;

const Content = styled.div`
  padding: 32px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #1f262d;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 32px 0;
`;

const CheckboxGroup = styled.div`
  margin-bottom: 32px;
`;

const CheckboxItem = styled.div<{ $isIndented?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-left: ${({ $isIndented }) => ($isIndented ? '40px' : '0')};
`;

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 4px;
  border-radius: 4px;
  accent-color: #000;
  cursor: pointer;
`;

const LabelContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelTitle = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 4px;
  cursor: pointer;
`;

const LabelDescription = styled.span`
  font-size: 16px;
  color: #1f262d;
  line-height: 1.5;
`;

const SubmitButton = styled(Button)`
  width: auto;
  min-width: 200px;
`;

const UnsubscribeGroup = styled.div`
  background: #f9fafb;
  padding: 24px;
  border-radius: 8px;
  margin-top: 32px;
`;

type Preferences = {
    ticket_alert: boolean;
    team_alert: boolean;
    venue_alert: boolean;
    performer_news: boolean;
    spotlight_news: boolean;
    special_event_offers: boolean;
    tips_and_info: boolean;
    partner_offers: boolean;
    sms_notifications: boolean;
}

export default function ManageAlertsPage() {
    const [prefs, setPrefs] = useState<Preferences>({
        ticket_alert: false,
        team_alert: false,
        venue_alert: false,
        performer_news: false,
        spotlight_news: false,
        special_event_offers: false,
        tips_and_info: false,
        partner_offers: false,
        sms_notifications: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [masterToggle, setMasterToggle] = useState(false);
    const [unsubscribeAll, setUnsubscribeAll] = useState(false);

    useEffect(() => {
        getAlertPreferences().then(({ preferences }) => {
            if (preferences) {
                setPrefs(preferences);
                // Check if all sub-items of master are checked
                const allMaster = preferences.ticket_alert && preferences.team_alert && preferences.venue_alert;
                setMasterToggle(allMaster);
            }
            setLoading(false);
        });
    }, []);

    const handleMasterToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setMasterToggle(checked);
        setPrefs(prev => ({
            ...prev,
            ticket_alert: checked,
            team_alert: checked,
            venue_alert: checked
        }));
        if (checked) setUnsubscribeAll(false);
    };

    const handleChange = (key: keyof Preferences) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setPrefs(prev => {
            const newPrefs = { ...prev, [key]: checked };

            // Should we untoggle master?
            if (['ticket_alert', 'team_alert', 'venue_alert'].includes(key)) {
                const allChecked = newPrefs.ticket_alert && newPrefs.team_alert && newPrefs.venue_alert;
                setMasterToggle(allChecked);
            }
            return newPrefs;
        });
        if (checked) setUnsubscribeAll(false);
    };

    const handleUnsubscribeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setUnsubscribeAll(checked);
        if (checked) {
            setPrefs({
                ticket_alert: false,
                team_alert: false,
                venue_alert: false,
                performer_news: false,
                spotlight_news: false,
                special_event_offers: false,
                tips_and_info: false,
                partner_offers: false,
                sms_notifications: false
            });
            setMasterToggle(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        await updateAlertPreferences(prefs);
        setSaving(false);
    };

    if (loading) return <Content>Loading preferences...</Content>;

    return (
        <Container>
            <Header>
                <Title>Manage Alerts</Title>
                <Description>
                    Get customised alerts about upcoming events, presales, and offers based on your preferences.
                </Description>
                <Divider />
            </Header>

            <Content style={{ paddingTop: 0 }}>
                {/* Master Group */}
                <CheckboxGroup>
                    <CheckboxItem>
                        <CheckboxInput
                            type="checkbox"
                            checked={masterToggle}
                            onChange={handleMasterToggle}
                            id="master-toggle"
                        />
                        <LabelContent>
                            <LabelTitle htmlFor="master-toggle">Get All Live Guide Alerts</LabelTitle>
                            <LabelDescription>
                                Personalized emails that deliver the latest news and event details about all your favorite artist, teams, and venues.
                            </LabelDescription>
                        </LabelContent>
                    </CheckboxItem>

                    <CheckboxItem $isIndented>
                        <CheckboxInput type="checkbox" checked={prefs.ticket_alert} onChange={handleChange('ticket_alert')} id="ticket_alert" />
                        <LabelContent>
                            <LabelTitle htmlFor="ticket_alert">Ticket Alert</LabelTitle>
                            <LabelDescription>Get a personalized list of upcoming events in your area.</LabelDescription>
                        </LabelContent>
                    </CheckboxItem>

                    <CheckboxItem $isIndented>
                        <CheckboxInput type="checkbox" checked={prefs.team_alert} onChange={handleChange('team_alert')} id="team_alert" />
                        <LabelContent>
                            <LabelTitle htmlFor="team_alert">Team Alert</LabelTitle>
                            <LabelDescription>Read about your favorite teams and leagues that are playing near you.</LabelDescription>
                        </LabelContent>
                    </CheckboxItem>

                    <CheckboxItem $isIndented>
                        <CheckboxInput type="checkbox" checked={prefs.venue_alert} onChange={handleChange('venue_alert')} id="venue_alert" />
                        <LabelContent>
                            <LabelTitle htmlFor="venue_alert">Venue Alert</LabelTitle>
                            <LabelDescription>Learn about the events happening at your favorite venues.</LabelDescription>
                        </LabelContent>
                    </CheckboxItem>
                </CheckboxGroup>

                <Divider />

                {/* Individual Items */}
                <CheckboxItem>
                    <CheckboxInput type="checkbox" checked={prefs.performer_news} onChange={handleChange('performer_news')} id="performer_news" />
                    <LabelContent>
                        <LabelTitle htmlFor="performer_news">Performer News</LabelTitle>
                        <LabelDescription>Get emails that provide details about when to buy tickets for all your favorites.</LabelDescription>
                    </LabelContent>
                </CheckboxItem>

                <CheckboxItem>
                    <CheckboxInput type="checkbox" checked={prefs.spotlight_news} onChange={handleChange('spotlight_news')} id="spotlight_news" />
                    <LabelContent>
                        <LabelTitle htmlFor="spotlight_news">Spotlight News</LabelTitle>
                        <LabelDescription>Get news that covers special events, new videos, and exciting artist and team announcements.</LabelDescription>
                    </LabelContent>
                </CheckboxItem>

                <CheckboxItem>
                    <CheckboxInput type="checkbox" checked={prefs.special_event_offers} onChange={handleChange('special_event_offers')} id="special_event_offers" />
                    <LabelContent>
                        <LabelTitle htmlFor="special_event_offers">Special Event Offers</LabelTitle>
                        <LabelDescription>Take advantage of timely ticket discounts, gift with purchase offers, and much more.</LabelDescription>
                    </LabelContent>
                </CheckboxItem>

                <CheckboxItem>
                    <CheckboxInput type="checkbox" checked={prefs.tips_and_info} onChange={handleChange('tips_and_info')} id="tips_and_info" />
                    <LabelContent>
                        <LabelTitle htmlFor="tips_and_info">Tips and Info</LabelTitle>
                        <LabelDescription>Get special announcements and helpful information on all things Ticketmaster.</LabelDescription>
                    </LabelContent>
                </CheckboxItem>

                <CheckboxItem>
                    <CheckboxInput type="checkbox" checked={prefs.partner_offers} onChange={handleChange('partner_offers')} id="partner_offers" />
                    <LabelContent>
                        <LabelTitle htmlFor="partner_offers">Partner Offers</LabelTitle>
                        <LabelDescription>Learn about special and exclusive offers from our different partners.</LabelDescription>
                    </LabelContent>
                </CheckboxItem>

                <Divider />

                {/* SMS Logic */}
                <CheckboxItem>
                    <CheckboxInput type="checkbox" checked={prefs.sms_notifications} onChange={handleChange('sms_notifications')} id="sms_notifications" />
                    <LabelContent>
                        <LabelTitle htmlFor="sms_notifications">SMS Text Notifications</LabelTitle>
                        <LabelDescription>
                            Check the box to receive special offers and other marketing alerts from us. By signing up, you authorize us to send recurring automated messages to the mobile number you provide. Consent is not a condition of purchase.
                        </LabelDescription>
                    </LabelContent>
                </CheckboxItem>

                {/* Unsubscribe Logic */}
                <UnsubscribeGroup>
                    <CheckboxItem style={{ marginBottom: 0 }}>
                        <CheckboxInput type="checkbox" checked={unsubscribeAll} onChange={handleUnsubscribeAll} id="unsubscribe_all" />
                        <LabelContent>
                            <LabelTitle htmlFor="unsubscribe_all">Unsubscribe From All Marketing Alerts</LabelTitle>
                            <LabelDescription>
                                You can resubscribe at any time to get the latest news about events, presales, and offers.
                            </LabelDescription>
                        </LabelContent>
                    </CheckboxItem>
                </UnsubscribeGroup>

                <div style={{ marginTop: '32px' }}>
                    <SubmitButton onClick={handleSave} disabled={saving}>
                        {saving ? 'Updating...' : 'Update Preferences'}
                    </SubmitButton>
                </div>
            </Content>
        </Container>
    );
}
